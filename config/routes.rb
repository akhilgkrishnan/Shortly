# frozen_string_literal: true

Rails.application.routes.draw do
  resources :urls, only: %i[index create update], param: :slug
  get "/:slug", to: "urls#show"

  root "home#index"
  get "*path", to: "home#index", via: :all
end
