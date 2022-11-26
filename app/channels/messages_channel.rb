class MessagesChannel < ApplicaitonCable::Channel
  def subscribed
    # stream_from 'messages'
  end
end