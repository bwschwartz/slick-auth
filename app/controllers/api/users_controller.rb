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
    puts "user display name is #{@user.display_name}"
    if @user
      @user.update(user_params)
      render :show
    else
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
