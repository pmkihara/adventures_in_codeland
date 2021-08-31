class PlaysController < ApplicationController
  # skip_before_action :authenticate_user!, only: %i[create]
  before_action :set_play, only: %i[show update destroy]

  def new
    @play = Play.new(score: 0, start_time: Time.now.to_i, user_position_x: 0, user_position_y: 0, lives: 3)
    @play.user = current_user
    @play.save
    # gerar tudo aqui specials_cells npcs
  end

  def show
    # TODO
  end

  def saves
    @plays = Play.where(user: current_user)
  end

  def save
    # TODO
  end

  def destroy
    @play.destroy
    redirect_to saves_path
  end

  private

  def set_play
    @play = Play.find(params[:id])
  end

  def generate_cell
    # special_cell = SpecialCell.new
  end

  def generate_npc
    # TODO
  end
end
