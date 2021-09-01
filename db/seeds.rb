puts "Creating!!!!"
puts "...."

User.destroy_all if Rails.env.development?

user = User.new(
  name: 'Pilantra',
  age: 12,
  email: 'p@p.com',
  password: "123456",
  password_confirmation: "123456"
)
user.save

puts "Finished Seed!!! =)"
