class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[home story score]
  def home
  end

  def story
  end

  def score
    @plays = Play.all
  end
end
