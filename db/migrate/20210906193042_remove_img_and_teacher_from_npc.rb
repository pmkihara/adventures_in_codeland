class RemoveImgAndTeacherFromNpc < ActiveRecord::Migration[6.0]
  def change
    remove_column :npcs, :img, :string
    remove_column :npcs, :teacher, :boolean
  end
end
