# frozen_string_literal: true

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_visitor_token

  def current_visitor_token
    # Allow test suite to supply visitor identity via header in test environment only
    if Rails.env.test? && request.headers["X-Visitor-Token"].present?
      return request.headers["X-Visitor-Token"]
    end

    token = cookies.encrypted[:visitor_token].presence || cookies[:visitor_token].presence
    if token.present?
      # Upgrade cookie to encrypted if it was plain
      if cookies.encrypted[:visitor_token].blank?
        cookies.permanent.encrypted[:visitor_token] = {
          value: token,
          httponly: true,
          same_site: :lax,
          secure: Rails.env.production?
        }
      end
      return token
    end

    new_token = SecureRandom.uuid
    cookies.permanent.encrypted[:visitor_token] = {
      value: new_token,
      httponly: true,
      same_site: :lax,
      secure: Rails.env.production?
    }
    new_token
  end
end
