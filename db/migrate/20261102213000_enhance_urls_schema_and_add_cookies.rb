# frozen_string_literal: true

class EnhanceUrlsSchemaAndAddCookies < ActiveRecord::Migration[6.1]
  def up
    # 1. Add visitor_token for cookie-based session isolation
    add_column :urls, :visitor_token, :string
    add_column :urls, :unique_clicks, :integer, default: 0, null: false

    # 2. Backfill existing records with a default seed token
    execute("UPDATE urls SET visitor_token = 'legacy_visitor' WHERE visitor_token IS NULL")
    execute("UPDATE urls SET unique_clicks = click_count WHERE unique_clicks = 0 AND click_count > 0")

    # 3. Add composite index for instant default_scope ordering by visitor
    add_index :urls, [:visitor_token, :is_pinned, :created_at],
      name: "index_urls_on_visitor_and_sorting"

    # 4. Remove old long_url index and add scoped unique index on [:visitor_token, :long_url]
    remove_index :urls, :long_url if index_exists?(:urls, :long_url)
    add_index :urls, [:visitor_token, :long_url], unique: true,
      name: "index_urls_on_visitor_and_long_url"
  end

  def down
    remove_index :urls, name: "index_urls_on_visitor_and_long_url" if index_exists?(
      :urls, [:visitor_token, :long_url],
      name: "index_urls_on_visitor_and_long_url")
    remove_index :urls, name: "index_urls_on_visitor_and_sorting" if index_exists?(
      :urls,
      [:visitor_token, :is_pinned, :created_at], name: "index_urls_on_visitor_and_sorting")
    add_index :urls, :long_url unless index_exists?(:urls, :long_url)
    remove_column :urls, :unique_clicks
    remove_column :urls, :visitor_token
  end
end
