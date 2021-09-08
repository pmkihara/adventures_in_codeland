class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[home story score]
  def home
  end

  def story
  end

  def score
    @plays = Play.where("end_time IS NOT NULL").order("score DESC")
  end
end
