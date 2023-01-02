# == Schema Information
#
# Table name: games
#
#  id         :bigint           not null, primary key
#  name       :string
#  cover_url  :string
#  summary    :string
#  status     :string
#  wishlisted :boolean
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Game < ApplicationRecord
  validates :name, presence: true
  enum status: [:not_started, :in_progress, :completed, :on_hold, :dropped, :backlog]

  require 'igdb_client'
  require 'json'


  def initialize
    
  end
  
  def self.get_games
    client = IGDB::Client.new(
      ENV['IGDB_CLIENT_ID'],
      ENV['IGDB_CLIENT_SECRET']
    )

    client.get(fields: "name", limit: 10)
  end  
end

