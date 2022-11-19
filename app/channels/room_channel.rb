class RoomChannel < ApplicationCable::Channel
  def subscribed
    # @room = Room.find_by(id: params[:id])
    # stream_from @room_channel
    # stream_for @room

    stream_from "room_channel"
  end
end