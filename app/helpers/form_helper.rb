module FormHelper
  def choose_path
    if current_user.name.nil?
      validate_name_path
    elsif current_user.age.nil?
      validate_age_path
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
