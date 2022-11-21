class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.string :content
      t.references :user, index: true, foreign_key: true
      t.references :channel, index: true, foreign_key: true
      t.timestamps
    end
  end
end
