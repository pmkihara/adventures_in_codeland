class Play < ApplicationRecord
  belongs_to :user
  has_many :special_cells, dependent: :destroy

  validates :user, :score, :start_time, :user_position_x, :user_position_y, :lives, presence: true
  validates :lives, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 3 }

  def cell_active
    special_cells.find_by(cell_status: "active_quest")
  end

  def active_next_cell
    current_active = cell_active
    current_active&.update(cell_status: "inactive_quest")
    current_active&.next_cell&.update(cell_status: "active_quest")
  end

  def game_over?
    @lives.zero?
  end

  def punishing
    @score -= 10
    @lives -= 1
  end
end
