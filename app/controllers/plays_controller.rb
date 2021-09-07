class PlaysController < ApplicationController
  # skip_before_action :authenticate_user!, only: %i[create]
  before_action :set_play, only: %i[show update destroy validate_answer]

  include GenerateCells

  def new
    @play = Play.new(score: 0, start_time: Time.now.to_i, user_position_x: 12, user_position_y: 20, lives: 3)
    authorize @play
    @play.user = current_user
    generate_cells(@play)
    redirect_to show_path(@play) if @play.save
  end

  def show
    authorize @play
  end

  def plays
    @plays = policy_scope(Play)
  end

  def save
    authorize @play
    @play.update(play_params)
  end

  def destroy
    authorize @play
    @play.destroy
    redirect_to saves_path
  end

  def validate_answer
    skip_authorization
    active_cell = @play.cell_active
    return unless active_cell

    if active_cell.npc.correct_answer?(params[:answer])
      @play.active_next_cell
      render json: { message: "Yay! Correct answer!", correct: true }
    else
      render json: { message: "Oh no! Wrong answer!", correct: false }
    end
  end

  def validate_name
    skip_authorization
    current_user.name = params[:answer]
  end

  def validate_age
    skip_authorization
    current_user.age = params[:answer]
  end

  def update_infos
    skip_authorization
    respond_to do |format|
      format.json do
        render json: hashing_infos
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

  def hashing_infos
    play_infos = {}
    hashing_play_infos(play_infos)
    play_infos
  end

  def hashing_play_infos(play_infos)
    play = Play.find(params[:id].to_i)
    play_infos[:score] = play.score
    play_infos[:user_position_x] = play.user_position_x
    play_infos[:user_position_y] = play.user_position_y
    play_infos[:lives] = play.lives
    play_infos[:special_cells] = []
    hashing_special_cells_info(play.special_cells, play_infos)
  end

  def hashing_special_cells_info(special_cells, play_infos)
    special_cells.each do |special_cell|
      cell_infos = {}
      cell_infos[:position_x] = special_cell.position_x
      cell_infos[:position_y] = special_cell.position_y
      cell_infos[:cell_status] = special_cell.cell_status
      cell_infos[:name_npc] = special_cell.npc.name
      cell_infos[:question] = special_cell.npc.question
      cell_infos[:random_speech] = special_cell.npc.speak
      play_infos[:special_cells] << cell_infos
    end
  end
end
