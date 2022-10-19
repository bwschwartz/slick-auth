class Api::ChannelsController < ApplicationController
  def index
    @channels = Channel.all
    render 'api/channels/index'
  end

  def create
    puts "hit create method"
    puts channel_params
    puts "exit create method"
     @channel = Channel.new(channel_params)
     if @channel.save!
      channel_id = @channel.id
      render json: {"#{channel_id}": @channel}
     else
      render json: { errors: @channel.errors.full_messages }, status: :unprocessable_entity
     end
  end

  def update
    puts "hit update"
    puts "params: #{channel_params}"
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

  private

  def channel_params
    params.require(:channel).permit(:id, :description, :title, :owner_id)
  end


end
