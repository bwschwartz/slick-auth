class ChannelsChannel < ApplicationCable::Channel
  def subscribed
    puts "params are these"
    puts params
    @channel = Channel.find(params[:id])
    stream_from 'messages'

  end

  # def unsubscribed
  #   stop_all_streams
  # end

end