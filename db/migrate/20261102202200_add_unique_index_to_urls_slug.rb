# frozen_string_literal: true

class AddUniqueIndexToUrlsSlug < ActiveRecord::Migration[6.1]
  def change
    remove_index :urls, :slug if index_exists?(:urls, :slug)
    add_index :urls, :slug, unique: true
  end
end
