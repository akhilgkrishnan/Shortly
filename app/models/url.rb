# frozen_string_literal: true

class Url < ApplicationRecord
  default_scope { order(is_pinned: :desc, created_at: :desc) }

  before_validation :sanitize_url
  before_validation :assign_default_visitor_token

  validates :visitor_token, presence: true
  validates :long_url,
    presence: true,
    uniqueness: { scope: :visitor_token, message: "has already been shortened by you" }
  validate :validate_long_url_format

  validates :short_url,
    presence: true,
    uniqueness: true
  validate :validate_short_url_format

  validates :slug, uniqueness: true

  private

    def assign_default_visitor_token
      self.visitor_token = visitor_token.presence || "default_visitor"
    end

    def sanitize_url
      return if long_url.blank?

      self.long_url = long_url.strip
      unless long_url.match?(%r{\Ahttps?://}i)
        self.long_url = "https://#{long_url}"
      end
    end

    def validate_long_url_format
      return if long_url.blank?

      unless long_url.match?(%r{\Ahttps?://[^\s/$.?#].[^\s]*\z}i)
        errors.add(:long_url, "is not a valid HTTP or HTTPS URL")
        return
      end

      uri = URI.parse(long_url)
      unless uri.is_a?(URI::HTTP) && uri.host.present? && !uri.host.include?(" ")
        errors.add(:long_url, "is not a valid HTTP or HTTPS URL")
      end
    rescue URI::InvalidURIError
      errors.add(:long_url, "is not a valid HTTP or HTTPS URL")
    end

    def validate_short_url_format
      return if short_url.blank?

      unless short_url.match?(%r{\Ahttps?://[^\s/$.?#].[^\s]*\z}i)
        errors.add(:short_url, "is not a valid HTTP or HTTPS URL")
      end
    end
end
