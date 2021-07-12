# frozen_string_literal: true

class UrlsController < ApplicationController
  before_action :load_url, only: %i[update show]
  def index
    urls = Url.all
    render json: { urls: urls }, status: :ok
  end

  def show
    @url.increment!(:click_count)
    redirect_to @url.long_url if @url.save
  end

  def create
    url = Url.new(url_params)
    url.short_url = shorten_url(slug: url.slug)
    if url.save
      render status: :ok, json: { notice: t('successfully_shortened') }
    else
      render status: :unprocessable_entity,
             json: { errors: url.errors.full_messages }
    end
  end

  def update
    if @url.update(is_pinned: params[:url][:is_pinned])
      render status: :ok, json: { notice: t('successfully_pinned') }
    else
      render status: :unprocessable_entity,
             json: { errors: url.errors.full_messages }
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
  rescue ActiveRecord::RecordNotFound => e
    render json: { errors: e }
  end

  def slug
    loop do
      random_slug = SecureRandom.alphanumeric(8)
      return random_slug unless Url.exists?(slug: random_slug)
    end
  end
end
