class PlaysController < ApplicationController
  # skip_before_action :authenticate_user!, only: %i[create]
  before_action :set_play, only: %i[show update destroy validate_answer]

  def new
    @play = Play.new(score: 0, start_time: Time.now.to_i, user_position_x: 0, user_position_y: 0, lives: 3)
    @play.user = current_user
    @play.save
    generate_cells(@play)
    # gerar tudo aqui specials_cells npcs
  end

  def show
    # TODO
  end

  def plays
    @plays = Play.where(user: current_user)
  end

  def save
    # TODO
  end

  def destroy
    @play.destroy
    redirect_to saves_path
  end

  def validate_answer
    if @play.cell_active.npc.resolution == params[:answer]
      @play.score += 3
      @play.cell_active.cell_status = "inactive_quest"
      # TODO
    end
  end

  private

  def set_play
    @play = Play.find(params[:id])
  end

  def generate_cells(play)
    SpecialCell.create(play: play, npc: generate_npc_rafa, cell_status: "active_quest", position_x: 0, position_y: 0)
  end

  def generate_npc_rafa
    rafa = Npc.new(name: "Rafa", img: "img", line: "test", question: "boa tarde?", resolution: "boa!", teacher: true)
    rafa.save
    rafa
  end
end
