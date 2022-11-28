json.set! 'current_channel' do
  json.title @channel.title
  json.description @channel.description
  json.owner_id @channel.owner_id
  json.messages @channel.messages
  json.id "current-channel"
end