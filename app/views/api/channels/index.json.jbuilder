json.array! (@channels) do |channel|
  json.title channel.title
  json.description channel.description
end