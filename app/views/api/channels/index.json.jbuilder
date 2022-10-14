json.array! (@channels) do |channel|
  json.title channel.title
  json.description channel.description
  json.owner_id channel.owner_id
end