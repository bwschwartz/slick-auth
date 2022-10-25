class UsersChannel < ApplicationCable::Channel

  def subscribed
    stream from 'user_channel'
  end

  def unsubscribed
  end
end