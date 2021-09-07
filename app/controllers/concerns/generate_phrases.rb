module GeneratePhrases
  def direction_for_active_cell(play)
    if play.cell_active
      npc_name = play.cell_active.npc.name.capitalize
      phrases = ["Now, you must find the #{npc_name}",
                 "I think #{npc_name} can help you escape from here",
                 "Go after our great friend #{npc_name} and he'll even help!"]
      phrases.sample
    else
      "You already finish all your tasks! You can go home! :)"
    end
  end

  def random_phrase_correct(play)
    phrases = ["Nice Ruby! #{direction_for_active_cell(play)}",
               "Great work! #{direction_for_active_cell(play)}",
               "Well done! #{direction_for_active_cell(play)}"]
    phrases.sample
  end

  def random_phrase_incorrect_and_tip(play)
    phrases = ["Oh no! Incorrect answer!",
               "Try again buddy! perhaps",
               "Wrong answer :(. Perhaps this can help: "]
    tips = [play.cell_active.npc.tip1, play.cell_active.npc.tip2, play.cell_active.npc.tip3].compact
    "#{phrases.sample} #{tips.sample}"
  end
end
