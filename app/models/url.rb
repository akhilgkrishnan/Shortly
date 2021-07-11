class Url < ApplicationRecord
  validates :long_url,
            presence: true,
            uniqueness: true,
            format: URI::DEFAULT_PARSER.make_regexp(%w[http https])
  validates :short_url,
            presence: true,
            uniqueness: true,
            format: URI::DEFAULT_PARSER.make_regexp(%w[http https])
  validates :slug, uniqueness: true

  after_initialize :set_slug

  private

  def set_slug
    loop do
      random_slug = SecureRandom.alphanumeric(8)
      break self.slug = random_slug unless Url.exists?(slug: random_slug)
    end
  end
end
