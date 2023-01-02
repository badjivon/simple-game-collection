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
require "test_helper"

class GameTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
