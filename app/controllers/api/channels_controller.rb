class Api::ChannelsController < ApplicationController
  def index
    @channels = Channel.all
    render 'api/channels/index'
  end

  def create
     @channel = Channel.new(channel_params)
     if @channel.save!
      channel_id = @channel.id
      render json: {"#{channel_id}": @channel}
     else
      render json: { errors: @channel.errors.full_messages }, status: :unprocessable_entity
     end
  end

  def update
    @channel = Channel.find_by(title: channel_params[:title])
    if @channel.update!(channel_params)
      render 'api/channels/update'
    else
      render json: { errors: @channel.errors.full_messages}, status: :unprocessable_entity
    end
  end


  private

  def channel_params
    params.require(:channel).permit(:owner_id, :description, :title)
  end


end
