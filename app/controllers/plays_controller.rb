class PlaysController < ApplicationController
  # skip_before_action :authenticate_user!, only: %i[create]
  before_action :set_play, only: %i[show update destroy validate_answer random_roberto_speech]

  include GenerateCells
  include GeneratePhrases
  include HashingInfos

  def new
    # Play.where(user: current_user).destroy_all if current_user.has_a_play?
    @play = Play.new(score: 1000, start_time: Time.now.to_i, user_position_x: 12, user_position_y: 20, lives: 3)
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

  # Method to validate user answer
  def validate_answer
    skip_authorization
    active_cell = @play.cell_active
    return unless active_cell

    if active_cell.npc.correct_answer?(params[:answer])
      @play.active_next_cell
      render json: { message: random_phrase_correct(@play), correct: true }
    else
      @play.punishing
      render json: { message: random_phrase_incorrect_and_tip(@play), correct: false }
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

  # API to request infos about the play
  def update_infos
    skip_authorization
    respond_to do |format|
      format.json do
        render json: hashing_infos
      end
    end
  end

  # API to request a random speach of Robert with a direction to user
  def random_roberto_speech
    skip_authorization
    respond_to do |format|
      format.json do
        render json: { roberto_speech: "#{RobertoBarros.in_ingrish} #{direction_for_active_cell(@play)}" }
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
end
