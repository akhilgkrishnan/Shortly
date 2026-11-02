# frozen_string_literal: true

class UrlsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :load_url, only: %i[update show destroy]
  def index
    urls = if params[:scope] == "all"
      Url.all
           else
             Url.where(visitor_token: current_visitor_token)
    end
    render json: { urls: urls, visitor_token: current_visitor_token }, status: :ok
  end

  def show
    cookie_key = "visited_slug_#{@url.slug}"
    if cookies[cookie_key].blank?
      cookies[cookie_key] = {
        value: "1",
        expires: 24.hours.from_now,
        httponly: true,
        same_site: :lax
      }
      Url.where(id: @url.id).update_all(
        "click_count = COALESCE(click_count, 0) + 1, unique_clicks = COALESCE(unique_clicks, 0) + 1"
      )
    else
      Url.where(id: @url.id).update_all("click_count = COALESCE(click_count, 0) + 1")
    end

    redirect_to @url.long_url, allow_other_host: true
  end

  def create
    url = Url.new(url_params)
    url.visitor_token = current_visitor_token
    url.short_url = shorten_url(slug: url.slug)
    if url.save
      render status: :ok, json: { notice: t("successfully_shortened"), url: url }
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

    if @url.update(is_pinned: params[:url][:is_pinned])
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
        return random_slug unless Url.exists?(slug: random_slug)
      end
    end
end
