class MessagesController < ApplicationController
  def create
    @message = Message.new(message_params)
    message.user = current_user
    if message.save
      RoomsChannel.broadcast_to(@message.channel, @message)
    else
    end
  end

  def show
  end

  private

  def message_params
    params.require(:message).permit(:content , :channel_id, :author_id)
  end
end