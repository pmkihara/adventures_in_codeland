class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[home]
  def home
  end

  def story
  end

  def score
  end
end
