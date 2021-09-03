# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_09_01_173122) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "npcs", force: :cascade do |t|
    t.string "name", null: false
    t.string "img", null: false
    t.string "question"
    t.string "resolution"
    t.boolean "teacher", default: false, null: false
    t.string "tip1"
    t.string "tip2"
    t.string "tip3"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "plays", force: :cascade do |t|
    t.integer "score", default: 0, null: false
    t.integer "start_time", default: 0, null: false
    t.integer "end_time"
    t.integer "user_position_x", null: false
    t.integer "user_position_y", null: false
    t.bigint "user_id", null: false
    t.integer "lives", default: 3, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_plays_on_user_id"
  end

  create_table "special_cells", force: :cascade do |t|
    t.string "cell_status", null: false
    t.integer "position_x", null: false
    t.integer "position_y", null: false
    t.bigint "play_id", null: false
    t.bigint "npc_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["npc_id"], name: "index_special_cells_on_npc_id"
    t.index ["play_id"], name: "index_special_cells_on_play_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name"
    t.integer "age"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "plays", "users"
  add_foreign_key "special_cells", "npcs"
  add_foreign_key "special_cells", "plays"
end
