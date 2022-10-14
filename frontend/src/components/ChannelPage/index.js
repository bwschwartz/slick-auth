import { fetchChannels } from '../../store/channels'
import { useDispatch, useSelector } from 'react-redux'
// import { fetchChanells } from '../../store/channels'

import { useEffect } from 'react'

export const ChannelPage = () => {

  const dispatch = useDispatch();
  const channelsObj = useSelector( (state) => state.channels ? state.channels : [] )
  const  channelsList = Object.values(channelsObj)[0]

  useEffect (()=> {
    dispatch(fetchChannels())
  }, [])

  const channelsLis = channelsList.map( (channel,i) => <li key={i}>{channel.title}</li>)

  return (
    <>
      <h1>Channels Page ;)</h1>
      <ul>{channelsLis}</ul>
    </>
  )
}