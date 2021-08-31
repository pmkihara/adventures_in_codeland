class Npc < ApplicationRecord
  has_one :special_cell

  validates :name, :img, :line, :question, :resolution, :teacher, :tip1, :tip2, :tip3, presence: true
end
