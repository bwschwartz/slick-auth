class MessagesController < ApplicationController
  def create
    message = Message.new(message_params)
    message.user = current_user
    if message.save
    else
    end
  end

  def show
  end

end