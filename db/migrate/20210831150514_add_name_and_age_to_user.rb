class AddNameAndAgeToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :name, :string, null: false
    add_column :users, :age, :integer, null: false
  end
end
