class Api::MessagesController < ApplicationController

  def index
    @messages = Channel.find(params[:channel_id]).messages
    render json: @messages
  end

  def create
    @message = Message.new(message_params)
    @message.user = current_user
    if @message.save
      # ChannelsChannel.broadcast_to(@message.channel, @message)
      # render json: {"#{@message}": @message}
      # ChannelsChannel.broadcast_to @message.channel,
      #  from_template('api/messages/show', message: @message)

      ActionCable.server.broadcast("chat_#{@message.channel_id}",from_template('api/messages/show', message: @message) )


    else
      render json: "error"
    end
  end

  def show
  end

  private

  def message_params
    params.permit(:content , :channel_id, :user_id)
  end
end