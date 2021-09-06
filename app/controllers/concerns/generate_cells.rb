module GenerateCells
  def npc_factory(name, question, resolution)
    new_npc = Npc.new(name: name, question: question, resolution: resolution)
    new_npc.save
    new_npc
  end

  def generate_npc_rafa
    npc_factory("rafa", "boa tarde!", "boa!")
  end

  def generate_npc_neto
    npc_factory("neto", "bom dia?", "bom!")
  end

  def generate_cells(play)
    neto = SpecialCell.create(play: play, npc: generate_npc_neto, cell_status: "inactive_quest", position_x: 16,
                              position_y: 35)
    SpecialCell.create(play: play, npc: generate_npc_rafa, cell_status: "active_quest", position_x: 21, position_y: 17,
                       next_cell: neto)
  end
end
