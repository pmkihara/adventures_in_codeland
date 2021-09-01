class Npc < ApplicationRecord
  has_one :special_cell

  validates :name, :img, :line, :teacher, presence: true
end
