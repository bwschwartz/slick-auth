# json.array! (@channels) do |channel|
#   json.title channel.title
#   json.description channel.description
#   json.owner_id channel.owner_id
#   json.id channel.id
# end

@channels.each do |channel|
  json.set! channel.id do
    json.title channel.title
    json.description channel.description
    json.owner_id channel.owner_id
    json.id channel.id
  end
end


