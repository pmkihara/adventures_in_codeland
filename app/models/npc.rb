class Npc < ApplicationRecord
  has_one :special_cell

  validates :name, presence: true

  def correct_answer?(answer)
    resolution == answer
  end
end
