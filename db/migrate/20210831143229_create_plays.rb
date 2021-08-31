class CreatePlays < ActiveRecord::Migration[6.0]
  def change
    create_table :plays do |t|
      t.integer :score, null: false, default: 0
      t.integer :start_time, null: false, default: 0
      t.integer :end_time
      t.integer :user_position_x, null: false
      t.integer :user_position_y, null: false
      t.references :user, null: false, foreign_key: true
      t.integer :lives, null: false, default: 3

      t.timestamps
    end
  end
end
