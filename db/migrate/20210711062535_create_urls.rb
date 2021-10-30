# frozen_string_literal: true

class CreateUrls < ActiveRecord::Migration[6.1]
  def change
    create_table :urls do |t|
      t.string :long_url, null: false, index: true, unique: true
      t.string :short_url, index: true
      t.integer :click_count, default: 0
      t.boolean :is_pinned, default: false
      t.string :slug, unique: true, index: true, null: false

      t.timestamps
    end
  end
end
