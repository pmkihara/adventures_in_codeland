class Play < ApplicationRecord
  belongs_to :user
  has_many :special_cells

  validates :user, :score, :start_time, :user_position_x, :user_position_y, :lives
  validates :lives, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 3 }
end
