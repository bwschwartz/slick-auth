# need to fix reset primary keys

ApplicationRecord.transaction do
  puts "Destroying tables..."
  User.destroy_all

  # puts "Resetting primary keys..."
  # ApplicationRecord.connection.reset_pk_sequence!('users') # Gives first user id of 1

  puts "Creating users..."

  User.create!(
    email: 'benjamin.schwart123@gmail.com',
    password: 'password123'
  )

  User.create!(
    email: 'demo@gmail.com',
    password: 'password'
  )

  10.times do
    User.create!({
      email:  Faker::Internet.unique.email,
      password: 'password'
    })
  end

  puts "Done!"

  puts "Creating channels..."

  Channel.create!(
    title: 'Dan',
    owner_id: 1
  )

  10.times do
    Channel.create!({
    title:  Faker::Hipster.unique.word,
    owner_id: 1
    })
  end

  puts "Done!"

  puts "Create user-channel assocations in join table..."

  ChannelUser.create!(
    channel_id: 1,
    user_id: 1,
  )

  ChannelUser.create!(
    channel_id: 1,
    user_id: 2,

  )

  ChannelUser.create!(
    channel_id: 1,
    user_id: 3,
  )

  puts "Done!"
# .create!(
#     title: 'Reasons we\'re ambivalent about Dan!'
#   )

  # 10.times do
  #   Channel.create!({
  #   title:  Faker::Hipster.unique.word
  #   })
  # end
end
