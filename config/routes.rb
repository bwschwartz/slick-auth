Rails.application.routes.draw do
  mount ActionCable.server => "/cable"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # post 'api/test', to: 'application#test'
  # root 'pages#index'
  # get 'pages/index'

  namespace :api, defaults: { format: :json } do
    resources :users, only: %i(create update)
    resources :channels, only: %i(index create update destroy show)
    resources :messages, only: %i(index create destroy)
    resource :session, only: %i(show create destroy)
  end

  get '*path', to: "static_pages#frontend_index"

end
