class PlayController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[new]
  def new
  end
end
