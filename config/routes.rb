Rails.application.routes.draw do
  mount ActionCable.server => "/cable"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # post 'api/test', to: 'application#test'

  # mount ActionCable.server => 'cable'
  # root 'pages#index'
  # get 'pages/index'

  namespace :api, defaults: { format: :json } do
    resources :users, only: :create
    resources :channels, only: %i(index create update destroy show), param: :slug
    resources :messages 
    resource :session, only: %i(show create destroy)
  end

  get '*path', to: "static_pages#frontend_index"

end
