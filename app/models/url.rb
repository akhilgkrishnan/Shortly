# frozen_string_literal: true

class Url < ApplicationRecord
  default_scope { order(is_pinned: :desc, created_at: :desc) }

  before_validation :sanitize_url
  before_validation :assign_default_visitor_token

  validates :visitor_token, presence: true
  validates :long_url,
    presence: true,
    uniqueness: { scope: :visitor_token, message: "has already been shortened by you" },
    format: URI::DEFAULT_PARSER.make_regexp(%w[http https])
  validates :short_url,
    presence: true,
    uniqueness: true,
    format: URI::DEFAULT_PARSER.make_regexp(%w[http https])
  validates :slug, uniqueness: true

  private

    def assign_default_visitor_token
      self.visitor_token = visitor_token.presence || "anonymous"
    end

    def sanitize_url
      return if long_url.blank?

      self.long_url = long_url.strip
      unless long_url.match?(%r{\Ahttps?://}i)
        self.long_url = "https://#{long_url}"
      end
    end
end
