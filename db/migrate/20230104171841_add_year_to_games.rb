class AddYearToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :year, :string
  end
end
