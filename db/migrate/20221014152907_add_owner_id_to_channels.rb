class AddOwnerIdToChannels < ActiveRecord::Migration[7.0]
  def change
    add_reference(:channels, :owner, foreign_key: {to_table: :users}, index: true, null: false)
  end
end
