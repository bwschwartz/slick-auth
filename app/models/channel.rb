# == Schema Information
#
# Table name: channels
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  owner_id    :integer          not null
#  description :string
#

class Channel < ApplicationRecord
  validates :title, uniqueness: true

  has_many :channel_users
  has_many :users, through: :channel_users
  belongs_to :owner, class_name: :User

  # def edit_description(description)
  #   self.description= description
  #   self.save!
  # end

  # def edit_name(name)
  #   self.name= name
  #   self.save!
  # end

  # def destroy_channel
  #   self.destroy!
  # end
end
