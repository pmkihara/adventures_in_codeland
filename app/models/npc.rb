class Npc < ApplicationRecord
  has_one :special_cell

  validates :name, presence: true

  def correct_answer?(answer)
    resolution_array = resolution.chars
    answer_array = answer.chars
    resolution_array.delete(" ")
    answer_array.delete(" ")

    resolution_array == answer_array
  end
end
