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
  validates :title, uniqueness: true

end
