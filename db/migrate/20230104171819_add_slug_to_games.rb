class AddSlugToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :slug, :string
  end
end
