Rails.application.routes.draw do
  devise_for :users, skip: :registrations
  as :user do
    get 'users/new', to: 'devise/registrations#new', as: :new_user_registration
    post 'users', to: 'devise/registrations#create', as: :user_registration
  end
  root to: 'pages#home'

  #rotas pages
  get '/story', to: 'pages#story'
  get '/score', to: 'pages#score'
  get '/credits', to: 'pages#credits'

  # rotas play
  get '/play', to: 'plays#new', as: 'new'
  get '/play/:id', to: 'plays#show', as: 'show'
  get '/plays', to: 'plays#plays', as: 'plays'
  patch '/play', to: 'plays#save', as: 'save'
  delete '/play/:id', to: 'plays#destroy', as: 'destroy'
  post '/play/:id/validate_answer', to: 'plays#validate_answer', as: 'validate_answer'
  post '/play/:id/validate_name', to: 'plays#validate_name', as: 'validate_name'
  post '/play/:id/validate_age', to: 'plays#validate_age', as: 'validate_age'

  # rotas api
  get '/play/:id/update_infos', to: 'plays#update_infos', as: 'update_infos'
  get '/play/:id/robertao', to: 'plays#random_roberto_speech'
end
