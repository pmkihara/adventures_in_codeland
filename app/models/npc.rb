require 'roberto_barros'

class Npc < ApplicationRecord
  has_one :special_cell

  validates :name, presence: true

  def speak
    RobertoBarros.quote
  end

  def correct_answer?(answer)
    resolution == answer
  end
end
