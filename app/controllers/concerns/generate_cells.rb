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

  def generate_npc_ana
    npc_factory(
      name: "ana",
      question: "Hello, Ruby! Did you say you need go back home? The only way to leave Codeland is through the Rake Portal, but it can not open while the inhabitants of of Codeland are in trouble. Are you ready to start? Type 'yes' (without the quotes) in the box at the bottom of the page!",
      resolution: 'yes',
      tip1: "Type 'yes' (without the quotes) in the box at the bottom of the page!"
    )
  end

  def generate_npc_rafa
    npc_factory(
      name: "rafa",
      question: 'The very first thing you learn in Codeland is how to print a string on your screen! A string is a set of characters that make a text, and it is surrounded by quote marks.<br>Try printing "Hello World".',
      resolution: 'puts "Hello World"',
      tip1: "You can use 'puts' (without the quote marks) to print something on the screen.",
      tip2: 'Do not forget to use double quote marks (") when you are typing your string!',
      tip3: 'Remember to write "Hello World" with the "H" and "W" capitalized"!'
    )
  end

  def generate_npc_neto
    npc_factory(
      name: "neto",
      question: 'I have heard that you can store all kinds of data in variables. I keep forgetting my address, can you help me store it in a variable called address?<br>I live in "the nice garden in Codeland".',
      resolution: 'address = "the nice garden in Codeland"',
      tip1: "To declare a variable, you need to type the name of the variable, followed by '=', and followed by the data you want to keep.",
      tip2: "This is how you declare a variable: variable = value",
      tip3: "Since you are storing a string, do not forget to use double quotes!"
    )
  end

  def generate_npc_ed
    npc_factory(
      name: "ed",
      question: 'I have mixed my variables and I do not know their types anymore. There is a method called #class that will return the type of value.<br>ruby = "Ruby the Cat"<br>is_a_cat = true<br>number_of_paws = 4<br><br>I need to know which class is_a_cat is, can you help me?',
      resolution: "is_a_cat.class",
      tip1: "You can call methods on variables by typing a dot (.) between the name of the variable and the method.",
      tip2: "This is how you can call a method on a variable: variable.method",
    )
  end

  def generate_npc_mari
    npc_factory(
      name: "mari",
      question: 'ruby = "RUBY THE CAT"<br>Oh no! Ruby is too big to pass through this door! They need to get smaller!',
      resolution: "is_a_cat.class",
      tip1: "You can call methods on variables by typing a dot (.) between the name of the variable and the method.",
      tip2: "This is how you can call a method on a variable: variable.method",
    )
  end

  def generate_npc_roberto
    npc_factory(
      name: "roberto",
      question: "I need to print how many tickets I have solved for Batch #690 of Le Wagon! The only thing I know that it is 5 times the amount of teachers in this map. Can you help me?<br>It is also possible to perform math operations just like using a calculator:<br> sum (+), difference (-), product (*), quotient (/) ",
      resolution: "puts 5 * 4",
      tip1: "I think there are 4 teachers on the map ;)",
      tip2: 'Do not forget to use "puts" to print the result!',
      tip3: "You might want to use the asterisk('*') to do the operation."
    )
  end

  def generate_cells(play)
    roberto = SpecialCell.create(
      play: play,
      npc: generate_npc_roberto,
      cell_status: "inactive_quest",
      position_x: 21,
      position_y: 17
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
      position_x: 30,
      position_y: 33,
      next_cell: ed
    )
    rafa = SpecialCell.create(
      play: play,
      npc: generate_npc_rafa,
      cell_status: "inactive_quest",
      position_x: 16,
      position_y: 35,
      next_cell: neto
    )
    SpecialCell.create(
      play: play,
      npc: generate_npc_ana,
      cell_status: "active_quest",
      position_x: 13,
      position_y: 20,
      next_cell: rafa
    )
  end
end
