# frozen_string_literal: true

class UrlsController < ApplicationController
  def index
    urls = Url.all
    render json: { urls: urls }, status: :ok
  end

  def create
    url = Url.new(url_params)
    url.short_url = shorten_url(slug: url.slug)
    if url.save!
      render status: :ok, json: { url: url }
    else
      errors = url.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  private

  def url_params
    params.require(:url).permit(:long_url)
  end

  def shorten_url(slug:)
    "#{request.base_url}/#{slug}"
  end
end