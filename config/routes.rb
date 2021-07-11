Rails.application.routes.draw do
  resources :urls, only: %i[index create], param: :slug
end
