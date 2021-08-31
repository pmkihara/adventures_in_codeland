class CreateNpcs < ActiveRecord::Migration[6.0]
  def change
    create_table :npcs do |t|
      t.string :name, null: false
      t.string :img, null: false
      t.string :line, null: false
      t.string :question, null: false
      t.string :resolution, null: false
      t.boolean :teacher, null: false, default: false
      t.string :tip1, null: false
      t.string :tip2, null: false
      t.string :tip3, null: false

      t.timestamps
    end
  end
end
