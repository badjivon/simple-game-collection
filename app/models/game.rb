# == Schema Information
#
# Table name: games
#
#  id         :bigint           not null, primary key
#  cover_url  :string
#  name       :string
#  slug       :string
#  status     :string
#  summary    :string
#  wishlisted :boolean
#  year       :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  rawg_id    :integer
#
class Game < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :rawg_id, presence: true, uniqueness: true
  enum status: [:not_started, :in_progress, :completed, :on_hold, :dropped, :backlog]

  require 'json'

  
  
end

