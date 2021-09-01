class Play < ApplicationRecord
  belongs_to :user
  has_many :special_cells, dependent: :destroy

  validates :user, :score, :start_time, :user_position_x, :user_position_y, :lives, presence: true
  validates :lives, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 3 }

  def cell_active
    special_cells.each do |special_cell|
      return special_cell if special_cell.cell_status == "active_quest"
    end
  end
end
