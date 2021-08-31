Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'

  # rotas play
  get '/play', to: 'plays#new', as: 'new'
  get '/play/:id', to: 'plays#show', as: 'show'
  get '/plays', to: 'plays#saves', as: 'saves'
  patch '/play', to: 'plays#save', as: 'save'
  delete '/play/:id', to: 'plays#destroy', as: 'destroy'
end
