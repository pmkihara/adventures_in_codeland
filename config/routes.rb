Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'

  #rotas pages
  get '/story', to: 'pages#story'
  get '/score', to: 'pages#score'

  # rotas play
  get '/play', to: 'plays#new', as: 'new'
  get '/play/:id', to: 'plays#show', as: 'show'
  get '/plays', to: 'plays#plays', as: 'plays'
  patch '/play', to: 'plays#save', as: 'save'
  delete '/play/:id', to: 'plays#destroy', as: 'destroy'
  post '/play/:id', to: 'plays#validate_answer', as: 'validate_answer'
  post '/play/:id', to: 'plays#validate_name', as: 'validate_name'
  post '/play/:id', to: 'plays#validate_age', as: 'validate_age'
end
