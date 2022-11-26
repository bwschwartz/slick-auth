class Api::MessagesController < ApplicationController
  def create
    @message = Message.new(message_params)
    @message.user = current_user
    if @message.save
      ChannelsChannel.broadcast_to(@message.channel, @message)
      render json: {"#{@message}": @message}
    else
      render json: "error bitch"
    end
  end

  def show
  end

  private

  def message_params
    params.permit(:content , :channel_id, :user_id)
  end
end