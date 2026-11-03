# frozen_string_literal: true

class UrlsController < ApplicationController
  before_action :load_url, only: %i[update show destroy]

  RESERVED_SLUGS = %w[urls packs assets rails favicon.ico robots.txt].freeze

  def index
    token = current_visitor_token
    urls = if params[:scope] == "all"
             Url.all
           else
             Url.where(visitor_token: token)
           end
    render json: { urls: urls.map { |url| serialize_url(url, token) } }, status: :ok
  end

  def show
    cookie_key = "visited_slug_#{@url.slug}"
    if cookies[cookie_key].blank?
      cookies[cookie_key] = {
        value: "1",
        expires: 24.hours.from_now,
        httponly: true,
        same_site: :lax,
        secure: Rails.env.production?
      }
      Url.update_counters(@url.id, click_count: 1, unique_clicks: 1)
    else
      Url.update_counters(@url.id, click_count: 1)
    end

    redirect_to @url.long_url, allow_other_host: true
  end

  def create
    url = Url.new(url_params)
    url.visitor_token = current_visitor_token
    url.short_url = shorten_url(slug: url.slug)
    if url.save
      render status: :ok, json: { notice: t("successfully_shortened"), url: serialize_url(url, current_visitor_token) }
    else
      render status: :unprocessable_entity,
             json: { errors: url.errors.full_messages }
    end
  rescue ActionController::ParameterMissing => e
    render status: :unprocessable_entity,
           json: { errors: [e.message] }
  rescue StandardError => e
    logger.error "#{e.class}: #{e.message}"
    logger.error e.backtrace.join("\n")
    render status: :internal_server_error,
           json: { errors: ["An unexpected error occurred: #{e.message}"] }
  end

  def update
    unless @url.visitor_token == current_visitor_token
      return render status: :forbidden, json: { errors: ["You are not authorized to modify this link."] }
    end

    pinned_param = params.require(:url).permit(:is_pinned)[:is_pinned]
    if @url.update(is_pinned: pinned_param)
      render status: :ok, json: { notice: t("successfully_pinned") }
    else
      render status: :unprocessable_entity,
             json: { errors: @url.errors.full_messages }
    end
  end

  def destroy
    unless @url.visitor_token == current_visitor_token
      return render status: :forbidden, json: { errors: ["You are not authorized to delete this link."] }
    end

    if @url.destroy
      render status: :ok, json: { notice: t("successfully_deleted") }
    else
      render status: :unprocessable_entity,
             json: { errors: @url.errors.full_messages }
    end
  end

  private

    def url_params
      params.require(:url).permit(:long_url).merge({ slug: slug })
    end

    def shorten_url(slug:)
      "#{request.base_url}/#{slug}"
    end

    def load_url
      @url = Url.find_by_slug!(params[:slug])
    rescue ActiveRecord::RecordNotFound
      render json: { errors: [t("not_found")] }, status: :not_found
    end

    def slug
      loop do
        random_slug = SecureRandom.alphanumeric(8)
        return random_slug unless RESERVED_SLUGS.include?(random_slug.downcase) || Url.exists?(slug: random_slug)
      end
    end

    def serialize_url(url, token = current_visitor_token)
      {
        id: url.id,
        slug: url.slug,
        short_url: url.short_url,
        long_url: url.long_url,
        is_pinned: url.is_pinned,
        click_count: url.click_count || 0,
        unique_clicks: url.unique_clicks || 0,
        created_at: url.created_at,
        updated_at: url.updated_at,
        owned: (url.visitor_token.present? && url.visitor_token == token)
      }
    end
end
