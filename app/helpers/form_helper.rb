module FormHelper
  def choose_path
    if current_user.name.nil?
      # caminho para atualizar o nome
    elsif current_user.age.nil?
      # caminho para atualizar a idade
    else
      validate_answer_path
    end
  end

  def stimulus_function
    if current_user.name.nil?
      "validateName"
    elsif current_user.age.nil?
      "validateAge"
    else
      "validateAnswer"
    end
  end
end
