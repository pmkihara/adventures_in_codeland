class SpecialCell < ApplicationRecord
  belongs_to :play
  belongs_to :npc
  has_one :next_cell, class_name: "SpecialCell", foreign_key: "special_cell_id"

  validates :cell_status,
            inclusion: { in: %w[blocked inactive_quest active_quest], message: "cell_status is not a valid status" }
  validates :cell_status, :position_x, :position_y, :play, presence: true
end
