# == Schema Information
#
# Table name: channels
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Channel < ApplicationRecord
  validates :title, presence: true, uniqueness: true

  has_many :channel_users
  has_many :messages, dependent: :destroy

  has_many :users, through: :messages

end
