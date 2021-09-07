class PlayPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where(user: user)
    end
  end

  def new?
    return true
  end

  def show?
    record.user == user
  end

  def save?
    record.user == user
  end

  def destroy?
    record.user == user
  end
end
