class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']
  # before_action :require_logged_out, only: [:create]

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render :show
    else
      render json: { errors: @user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    @user = User.find(params[:id])
    if @user
      if user_params[:photo] == "delete"
        @user.photo.purge
        puts"-----"
        puts"-----"

        puts("user_params are", user_params.except(:photo))
        puts"-----"
        puts"-----"
        @user.update(user_params.except(:photo))
        render :show
      else
        @user.update(user_params)
        render :show
      end
    else
      puts "im in the erroors bitch"
      render json: user.errors.full_messages, status: 422
    end
  end

  def add_message
    user = User.find(params[:user_id])
    message = params[:message]
    created_message = user.messages.create(content: message)
    ActionCable.server.broadcast('message-channel', created_message)
    head :ok
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :username, :photo, :display_name, :full_name, :title)
  end
end
