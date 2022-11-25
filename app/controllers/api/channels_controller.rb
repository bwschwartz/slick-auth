class Api::ChannelsController < ApplicationController
  def index
    @channels = Channel.all
    render 'api/channels/index'
  end

  def show
    @channel = Channel.find_by()
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
    # channel_params[:id] = channel_params[:id].to_i + 1
    @channel = Channel.find(channel_params[:id])

    if @channel and @channel.update(channel_params)
      puts('updating')
      # render 'api/channels/update'
    else
      puts('elsing \n \n')

    #   # render json: {errors: channel not fo}
    #   # render json: { errors: @channel.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    @channel = Channel.find(params[:slug])
    if @channel
      puts "inside if"
      @channel.delete()
      render json: {message: 'deleted the channel'}
    else
      puts "inside else"
      render json: { errors: @channel.errors.full_messages }
    end
  end

  private

  def channel_params
    params.require(:channel).permit(:id, :description, :title, :owner_id)
  end


end
