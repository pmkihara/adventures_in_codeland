module HashingInfos
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
    play_infos[:game_over] = play.end_time ? true : false
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
      play_infos[:special_cells] << cell_infos
    end
  end
end
