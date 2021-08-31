class CreateNpcs < ActiveRecord::Migration[6.0]
  def change
    create_table :npcs do |t|
      t.string :name, null: false
      t.string :img, null: false
      t.string :line, null: false
      t.string :question
      t.string :resolution
      t.boolean :teacher, null: false, default: false
      t.string :tip1
      t.string :tip2
      t.string :tip3

      t.timestamps
    end
  end
end
