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

  10.times do
    User.create!({
      email:  Faker::Internet.unique.email,
      password: 'password'
    })
  end

  puts "Done!"

end
