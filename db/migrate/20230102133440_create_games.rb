class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.string :name
      t.string :cover_url
      t.string :summary
      t.string :status
      t.boolean :wishlisted

      t.timestamps
    end
  end
end
