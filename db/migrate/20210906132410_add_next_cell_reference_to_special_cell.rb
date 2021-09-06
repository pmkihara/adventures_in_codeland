class AddNextCellReferenceToSpecialCell < ActiveRecord::Migration[6.0]
  def change
    add_reference :special_cells, :special_cell, foreign_key: true
  end
end
