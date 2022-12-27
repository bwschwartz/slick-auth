json.user do
  json.extract! @user, :id, :email, :created_at, :updated_at, :display_name, :full_name, :title, :status
  json.photoUrl @user.photo.url
end