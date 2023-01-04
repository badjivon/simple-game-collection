class AddRawgIdToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :rawg_id, :integer
  end
end
