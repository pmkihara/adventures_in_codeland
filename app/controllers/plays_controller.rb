class PlaysController < ApplicationController
  # skip_before_action :authenticate_user!, only: %i[create]
  before_action :set_play, only: %i[show update destroy validate_answer info_map]

  def new
    @play = Play.new(score: 0, start_time: Time.now.to_i, user_position_x: 0, user_position_y: 8, lives: 3)
    @play.user = current_user
    @play.save
    generate_cells(@play)
    redirect_to show_path(@play)
  end

  def show
    @hash_infos = []
    @play.special_cells.each do |special_cell|
      hash = {}
      hash[:positionX] = special_cell.position_x
      hash[:positionY] = special_cell.position_y
      hash[:cellStatus] = special_cell.cell_status
      hash[:nameNpc] = special_cell.npc.name
      hash[:question] = special_cell.npc.question
      hash[:randomSpeech] = special_cell.npc.speak
      @hash_infos << hash
    end
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
    if @play.cell_active.npc.correct_answer?(params[:answer])
      @play.next_active_cell.cell_status = "active_quest"
      @play.cell_active.cell_status = "inactive_quest"
      render json: { message: "Yay! Correct answer!" }
    else
      render json: { message: "Oh no! Wrong answer!" }
    end
  end

  private

  def set_play
    @play = Play.find(params[:id])
  end

  def generate_cells(play)
    SpecialCell.create(play: play, npc: generate_npc_rafa, cell_status: "active_quest", position_x: 7, position_y: 5)
    SpecialCell.create(play: play, npc: generate_npc_neto, cell_status: "inactive_quest", position_x: 1, position_y: 12)
  end

  def generate_npc_rafa
    rafa = Npc.new(name: "rafa", img: "img", question: "boa tarde?!", resolution: "boa!", teacher: true)
    rafa.save
    rafa
  end

  def generate_npc_neto
    neto = Npc.new(name: "neto", img: "img", question: "bom dia?", resolution: "bom!", teacher: true)
    neto.save
    neto
  end
end
