json.user do
  json.extract! @user, :id, :email, :created_at, :updated_at
  json.photoUrl @user.photo.url
end