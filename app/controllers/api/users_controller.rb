class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']
  # before_action :require_logged_out, only: [:create]

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      # render json: { user: @user}
      render :show
    else
      render json: { errors: @user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def add_message
    user = User.find(params[:user_id])
    message = params[:message]
    created_message = user.messages.create(content: message)
    ActionCAble.server.broadcast('message-channel', created_message)
    head :ok
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :username)
  end
end
