module FormHelper
  def stimulus_function
    if current_user.name.nil?
      # caminho para atualizar o nome
    elsif current_user.age.nil?
      # caminho para atualizar a idade
    else
      "validateAnswer"
    end
  end

  def choose_path
    if current_user.name.nil?
      # caminho para atualizar o nome
    elsif current_user.age.nil?
      # caminho para atualizar a idade
    else
      validate_answer_path
    end
  end
end
