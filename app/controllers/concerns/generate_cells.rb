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

  def generate_npc_welcome1
    npc_factory(
      name: "ruby",
      question: "Hello! My name is Ruby, and I am lost in this new land where everything works by writing code! I need to get back home, but I can not do it on my own.<br>Can you help me? Type 'yes' (without the quotes) in the box at the bottom of the page, than move down and up again!",
      resolution: 'yes',
      tip1: "Type 'yes' (without the quotes) in the box at the bottom of the page!"
    )
  end

  def generate_npc_welcome2
    npc_factory(
      name: "ruby",
      question: "Yay! You can control my movements by using the keyboard arrows to move up, down, left, and right.<br>People will talk to you if you are next to them. Type 'yes' and move left and right.",
      resolution: 'yes',
      tip1: "Type 'yes' (without the quotes) in the box at the bottom of the page!"
    )
  end

  def generate_npc_welcome3
    npc_factory(
      name: "ruby",
      question: 'I will need to pass through the Rake Portal to get home, but the portal will open only after we have helped all the inhabitants of the Codeland.<br>Are you ready to start?',
      resolution: 'yes',
      tip1: "Type 'yes' (without the quotes) in the box at the bottom of the page!"
    )
  end

  def generate_npc_rafa
    npc_factory(
      name: "rafa",
      question: 'The very first thing you learn in Codeland is how to print a string on your screen! A string is a set of characters that make a text, and it is surrounded by quote marks.<br>How do we print "Hello World" on the screen?',
      resolution: 'puts "Hello World"',
      tip1: "You can use 'puts' (without the quote marks) to print something on the screen.",
      tip2: 'Do not forget to use double quote marks (") when you are typing your string!'
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
      tip3: "You might want to use the asterisk('*') to do the operation."
    )
  end

  def generate_npc_roberto
    npc_factory(
      name: "roberto",
      question: "I need to print how many tickets I have solved for Batch #690 of Le Wagon! The only thing I know that it is 5 times the amount of teachers in this map. Can you help me?<br>It is also possible to perform math operations just like using a calculator:<br> sum (+), difference (-), product (*), quotient (/) ",
      resolution: "puts 5 * #{@play.special_cells.length - 4}",
      tip1: "I think there are #{@play.special_cells.length - 4} teachers on the map ;)",
      tip2: 'Do not forget to use "puts" to print the result!'
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
    welcome3 = SpecialCell.create(
      play: play,
      npc: generate_npc_welcome3,
      cell_status: "inactive_quest",
      position_x: 11,
      position_y: 19,
      next_cell: rafa
    )
    welcome2 = SpecialCell.create(
      play: play,
      npc: generate_npc_welcome2,
      cell_status: "inactive_quest",
      position_x: 11,
      position_y: 19,
      next_cell: welcome3
    )
    SpecialCell.create(
      play: play,
      npc: generate_npc_welcome1,
      cell_status: "active_quest",
      position_x: 11,
      position_y: 19,
      next_cell: welcome2
    )
  end
end
