# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  full_name       :string
#  display_name    :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password
  has_one_attached :photo
  has_many :channels, through: :channel_users
  has_many :channel_users
  has_many :messages, dependent: :destroy
    before_validation :ensure_session_token

  validates :email,
    uniqueness: true,
    length: { in: 3..355 },
    format: { with: URI::MailTo::EMAIL_REGEXP, message: "must be a valid" }

  validates :session_token,
    presence: true,
    uniqueness: true

  validates :password,
    length: { in: 3...100 },
    allow_nil: true

  def self.find_by_credentials(email, password)
    @user = User.find_by(email: email)
    @user.authenticate(password) if @user
  end

  def generate_unique_session_token
    while true
      token = SecureRandom.urlsafe_base64(16)
      return token unless User.find_by(session_token: token)
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end

  def reset_session_token!
    self.update!(session_token: generate_unique_session_token)
    self.session_token
  end

end
