# == Schema Information
#
# Table name: games
#
#  id         :bigint           not null, primary key
#  cover_url  :string
#  name       :string
#  status     :string
#  summary    :string
#  wishlisted :boolean
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  rawg_id    :integer
#
class Game < ApplicationRecord
  validates :name, presence: true
  enum status: [:not_started, :in_progress, :completed, :on_hold, :dropped, :backlog]

  require 'json'

  
  
end

