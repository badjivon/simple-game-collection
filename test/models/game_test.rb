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
require "test_helper"

class GameTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
