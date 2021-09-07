module StartHelper
  def start_path
    if current_user
      if current_user.plays.empty?
        new_path
      else
        plays_path
      end
    else
      new_user_session_path
    end
  end
end
