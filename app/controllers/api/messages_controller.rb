class MessagesController < ApplicationController

  def create
    message = Message.new(message_params)
    message.user = current_user
    if message.save
      ActionCable.server.broadcast 'messages',
      message: message.content,
      user: message.user.username
      head :ok
    end
  end

  def index
    messages = Message.stream
    render json: messages
  end

end