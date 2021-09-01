class RemoveLineFromNpc < ActiveRecord::Migration[6.0]
  def change
    remove_column :npcs, :line
  end
end
