# frozen_string_literal: true

class Url < ApplicationRecord
  default_scope { order(is_pinned: :desc, created_at: :desc) }
  validates :long_url,
    presence: true,
    uniqueness: true,
    format: URI::DEFAULT_PARSER.make_regexp(%w[http https])
  validates :short_url,
    presence: true,
    uniqueness: true,
    format: URI::DEFAULT_PARSER.make_regexp(%w[http https])
  validates :slug, uniqueness: true
end
