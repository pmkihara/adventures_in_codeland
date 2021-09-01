# require 'roberto_barros'

class Npc < ApplicationRecord
  has_one :special_cell

  validates :name, :img, :teacher, presence: true

  def speak
    unless cell_active
      # RobertoBarros.in_ingrish
    end
  end
end
