class Api::MessagesController < ApplicationController

  def index
    @messages = Message.all
    RoomChannel.broadcast_to(RoomChannel, @messages)
    render 'api/messages/show'
  end

end