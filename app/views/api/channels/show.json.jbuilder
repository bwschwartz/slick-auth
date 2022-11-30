json.set! 'current_channel' do
  json.title @channel.title
  json.description @channel.description
  json.owner_id @channel.owner_id
  json.messages @channel.messages
  json.id "current-channel"
  json.users @channel.users.each do |user|
    json.set! user.id do
      # json.id user.id
      json.username user.username
      json.email user.email
      json.photoUrl user.photo.url
    end
  end


  # json.users @channel.users.each do |user|
  #   json.set! user.id do
  #     json.email  user.email
  #   end
  # end

  # json.users @channel.users.id each do |user|
  #   json.set! user.id do
  #     json.email user.email
  #     json.username user.username
  #   end
  # end
end