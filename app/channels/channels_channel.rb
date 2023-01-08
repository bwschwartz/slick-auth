class ChannelsChannel < ApplicationCable::Channel
  def subscribed
    # @channel = Channel.find(params[:id])
    # stream_for @channel
    stream_from "chat_#{params[:id]}"
  end

  def unsubscribed
    stop_all_streams
  end

end