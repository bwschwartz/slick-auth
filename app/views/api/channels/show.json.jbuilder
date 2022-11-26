json.set! 'current_channel' do
  json.title @current_channel.title
  json.description @current_channel.description
  json.owner_id @current_channel.owner_id
  json.id "current-channel"
end