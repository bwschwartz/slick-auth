class AddRoomIdToChannels < ActiveRecord::Migration[7.0]
  def change
    add_column :channels, :room_id, :string
  end
end
