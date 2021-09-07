module GenerateCells
  def npc_factory(attrs = {})
    new_npc = Npc.new(
      name: attrs[:name],
      question: attrs[:question],
      resolution: attrs[:resolution],
      tip1: attrs[:tip1],
      tip2: attrs[:tip2],
      tip3: attrs[:tip3]
    )
    new_npc.save
    new_npc
  end

  def generate_npc_rafa
    npc_factory(
      name: "rafa",
      question: "boa tarde!",
      resolution: "boa!",
      tip1: "Só as 3 primeiras letras :)"
    )
  end

  def generate_npc_neto
    npc_factory(
      name: "neto",
      question: "bom dia?",
      resolution: "bom!",
      tip1: "Até o espaço :)",
      tip2: "Forma resumida :)"
    )
  end

  def generate_npc_ed
    npc_factory(
      name: "ed",
      question: "boa noite?",
      resolution: "boa!",
      tip1: "Qualquer",
      tip2: "uma"
    )
  end

  def generate_npc_roberto
    npc_factory(
      name: "roberto",
      question: "bom madrugada?",
      resolution: "boa!",
      tip1: "Tanto",
      tip2: "faz"
    )
  end

  def generate_cells(play)
    roberto = SpecialCell.create(
      play: play,
      npc: generate_npc_roberto,
      cell_status: "inactive_quest",
      position_x: 30,
      position_y: 33
    )
    ed = SpecialCell.create(
      play: play,
      npc: generate_npc_ed,
      cell_status: "inactive_quest",
      position_x: 35,
      position_y: 11,
      next_cell: roberto
    )
    neto = SpecialCell.create(
      play: play,
      npc: generate_npc_neto,
      cell_status: "inactive_quest",
      position_x: 16,
      position_y: 35,
      next_cell: ed
    )
    SpecialCell.create(
      play: play,
      npc: generate_npc_rafa,
      cell_status: "active_quest",
      position_x: 21,
      position_y: 17,
      next_cell: neto
    )
  end
end
