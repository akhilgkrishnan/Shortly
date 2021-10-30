# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_07_11_062535) do

  create_table "urls", force: :cascade do |t|
    t.string "long_url", null: false
    t.string "short_url"
    t.integer "click_count", default: 0
    t.boolean "is_pinned", default: false
    t.string "slug", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["long_url"], name: "index_urls_on_long_url"
    t.index ["short_url"], name: "index_urls_on_short_url"
    t.index ["slug"], name: "index_urls_on_slug"
  end

end
