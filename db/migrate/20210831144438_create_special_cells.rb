class CreateSpecialCells < ActiveRecord::Migration[6.0]
  def change
    create_table :special_cells do |t|
      t.string :cell_status, null: false
      t.integer :position_x, null: false
      t.integer :position_y, null: false
      t.references :play, null: false, foreign_key: true
      t.references :npc, foreign_key: true

      t.timestamps
    end
  end
end
