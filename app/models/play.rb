class Play < ApplicationRecord
  belongs_to :user
  has_many :special_cells, dependent: :destroy

  validates :user, :score, :start_time, :user_position_x, :user_position_y, presence: true

  def cell_active
    special_cells.find_by(cell_status: "active_quest")
  end

  def active_next_cell
    current_active = cell_active
    current_active&.update(cell_status: "inactive_quest")
    current_active&.next_cell&.update(cell_status: "active_quest")
  end

  def check_if_game_over
    return unless cell_active.nil?

    end_time = Time.now.to_i
    new_score = (1_000_000 / (end_time - start_time))
    update(score: new_score, end_time: end_time)
  end
end
