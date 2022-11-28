# json.message do
#   json.partial! 'api/messages/message', message: message
# end


# json.extract! message,
# :id,
# :content,
# :user_id,
# :channel_id,
# :created_at


json.set! message.id do
  json.content message.content
  json.user_id message.user_id
  json.channel_id message.channel_id
  json.created_at message.created_at
end