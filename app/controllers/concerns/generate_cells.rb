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
      question: "Hello, Ruby! Did you say you need to go back home? The only way to leave Codeland is through the Rake Portal, but it can not open while the inhabitants of Codeland are in trouble. Are you ready to start? Type 'yes' (without the quotes) in the box at the bottom of the page!",
      resolution: 'yes',
      tip1: "<br>Type 'yes' (without the quotes) in the box at the bottom of the page!<br>"
    )
  end

  def generate_npc_rafa
    npc_factory(
      name: "rafa",
      question: 'The very first thing you learn in Codeland is how to print a string on your screen! A string is a text, and it is surrounded by quote marks.<br>Now try printing "Hello World".',
      resolution: 'puts "Hello World"',
      tip1: "<br>You can use 'puts' (without the quote marks) to print something on the screen.<br>",
      tip2: '<br>Do not forget to use double quote marks (") when you are typing your string!<br>',
      tip3: '<br>Remember to write "Hello World" with the "H" and "W" capitalized"!<br>'
    )
  end

  def generate_npc_neto
    npc_factory(
      name: "neto",
      question: 'I have heard that you can store all kinds of data in variables. I keep forgetting my address, can you help me store it in a variable called address?<br>I live in "the nice garden in Codeland".',
      resolution: 'address = "the nice garden in Codeland"',
      tip1: "<br>To declare a variable, you need to type the name of the variable, followed by '=', and followed by the data you want to keep.<br>",
      tip2: "<br>This is how you declare a variable: variable = value.<br>",
      tip3: "<br>Since you are storing a string, do not forget to use double quotes!<br>"
    )
  end

  def generate_npc_ed
    npc_factory(
      name: "ed",
      question: 'I have mixed my variables and I do not know their types anymore. There is a method called #class that will return the type of value.<br>ruby = "Ruby the Cat"<br>is_a_cat = true<br>number_of_paws = 4<br><br>I need to know which class is_a_cat is, can you help me?',
      resolution: "is_a_cat.class",
      tip1: "<br>You can call methods on variables by typing a dot (.) between the name of the variable and the method.<br>",
      tip2: "<br>This is how you can call a method on a variable: variable.method.<br>"
    )
  end

  def generate_npc_mari
    npc_factory(
      name: "mari",
      question: 'ruby = "RUBY THE CAT"<br><br>Oh no! Ruby is too big to pass through this door! You can use the method #downcase! on the [ruby] variable to make it smaller (it should become like this: "ruby the cat").',
      resolution: "ruby.downcase!",
      tip1: "<br>You can call methods on variables by typing a dot (.) between the name of the variable and the method.<br>",
      tip2: "<br>This is how you can call a method on a variable: variable.method.<br>",
      tip3: "<br>Do not forget the exclamation mark (!) after the method! Otherwise Ruby will not stay small for long!"
    )
  end

  def generate_npc_nic
    npc_factory(
      name: "nic",
      question: 'I am already tired of turning around, but I got stuck in an infinite loop! Can you change the third line of the code below?<br><br>while tired == false<br>&nbsp;&nbsp;turn around<br>&nbsp;&nbsp;tired = false<br>end',
      resolution: "tired = true",
      tip1: "<br>A loop is a way to repeat an action without having to write it again. However, an infinite loop is like being stuck inside a car circuit without a brake.<br>",
      tip2: "<br>The while loop keeps running as long as the condition set in the first line is not satisfied. You will need to change it in order to leave the loop.<br>"
    )
  end

  def generate_npc_roberto
    npc_factory(
      name: "roberto",
      question: "I need to print how many tickets I have solved for Batch #690 of Le Wagon! The only thing I know that it is 7 times the amount of people in this map. Can you help me?<br>It is also possible to perform math operations just like using a calculator:<br> sum (+), difference (-), product (*), quotient (/) ",
      resolution: "puts 7 * 7",
      tip1: "<br>I think there are 7 people here ;)<br>",
      tip2: '<br>Do not forget to use "puts" to print the result!<br>',
      tip3: "<br>You might want to use the asterisk('*') to do the operation.<br>"
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
    nic = SpecialCell.create(
      play: play,
      npc: generate_npc_nic,
      cell_status: "inactive_quest",
      position_x: 30,
      position_y: 19,
      next_cell: roberto
    )
    mari = SpecialCell.create(
      play: play,
      npc: generate_npc_mari,
      cell_status: "inactive_quest",
      position_x: 9,
      position_y: 25,
      next_cell: nic
    )
    ed = SpecialCell.create(
      play: play,
      npc: generate_npc_ed,
      cell_status: "inactive_quest",
      position_x: 35,
      position_y: 11,
      next_cell: mari
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
      position_x: 12,
      position_y: 21,
      next_cell: rafa
    )
  end
end
