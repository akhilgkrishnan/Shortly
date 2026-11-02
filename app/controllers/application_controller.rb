# frozen_string_literal: true

class ApplicationController < ActionController::Base
  helper_method :current_visitor_token

  def current_visitor_token
    header_token = request.headers["X-Visitor-Token"].presence
    return header_token if header_token

    token = cookies[:visitor_token]
    return token if token.present?

    new_token = SecureRandom.uuid
    cookies.permanent[:visitor_token] = {
      value: new_token,
      httponly: true,
      same_site: :lax
    }
    new_token
  end
end
