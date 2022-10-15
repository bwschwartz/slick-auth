import { fetchChannels } from '../../store/channels'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import './ChannelPage.css'

export const ChannelPage = () => {

  const dispatch = useDispatch();
  const channelsObj = useSelector( (state) => state.channels ? Object.values(state.channels) : [] )

  useEffect (()=> {
    dispatch(fetchChannels())
  }, [])

  const channelsLis = channelsObj.map( (channel, i) => <li key={i}>#      {channel.title}</li>)

  return (
    <>
    <div id="channels-component">
      <h5>Channels</h5>

      <ul id="channel-list">{channelsLis}</ul>

    </div>

    </>
  )
}