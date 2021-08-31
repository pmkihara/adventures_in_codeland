class SpecialCell < ApplicationRecord
  belongs_to :play
  belongs_to :npc

  validates :cell_status,
            inclusion: { in: %w[blocked inactive_quest active_quest], message: "cell_status is not a valid status" }
  validates :cell_status, :position_x, :position_y, :play, presence: true
end
