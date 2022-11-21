class RoomChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    stream_from "chat_#{room_id}"
  end

  def unsubscribed
    stop_all_streams
  end

end