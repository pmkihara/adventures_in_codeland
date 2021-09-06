class PlaysController < ApplicationController
  # skip_before_action :authenticate_user!, only: %i[create]
  before_action :set_play, only: %i[show update destroy validate_answer]

  def new
    @play = Play.new(score: 0, start_time: Time.now.to_i, user_position_x: 0, user_position_y: 8, lives: 3)
    @play.user = current_user
    generate_cells(@play)
    redirect_to show_path(@play) if @play.save
  end

  def show
    @hash_infos = []

    play_infos = {}
    play_infos[:score] = @play.score
    play_infos[:user_position_x] = @play.user_position_x
    play_infos[:user_position_y] = @play.user_position_y
    play_infos[:lives] = @play.lives
    @hash_infos << play_infos
    @play.special_cells.each do |special_cell|
      cell_infos = {}
      cell_infos[:position_x] = special_cell.position_x
      cell_infos[:position_y] = special_cell.position_y
      cell_infos[:cell_status] = special_cell.cell_status
      cell_infos[:name_npc] = special_cell.npc.name
      cell_infos[:question] = special_cell.npc.question
      cell_infos[:random_speech] = special_cell.npc.speak
      @hash_infos << cell_infos
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
    active_cell = @play.cell_active
    if active_cell
      if active_cell.npc.correct_answer?(params[:answer])
        @play.active_next_cell
        render json: { message: "Yay! Correct answer!", correct: true }
      else
        render json: { message: "Oh no! Wrong answer!", correct: false }
      end
    end
  end

  private

  def set_play
    @play = Play.find(params[:id])
  end

  def play_params
    params.require(:play).permit(:score, :user_position_x, :user_position_y, :lives)
  end

  def generate_cells(play)
    neto = SpecialCell.create(play: play, npc: generate_npc_neto, cell_status: "inactive_quest", position_x: 1,
                              position_y: 12)
    SpecialCell.create(play: play, npc: generate_npc_rafa, cell_status: "active_quest", position_x: 7, position_y: 5,
                       next_cell: neto)
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
