import { fetchChannels } from '../../store/channels'
import {ChannelCreationForm} from '../ChannelCreationForm'
import { useDispatch, useSelector } from 'react-redux'
// import { fetchChanells } from '../../store/channels'

import { useEffect } from 'react'

export const ChannelPage = () => {

  const dispatch = useDispatch();
  const channelsObj = useSelector( (state) => state.channels ? Object.values(state.channels) : [] )

  useEffect (()=> {
    dispatch(fetchChannels())
  }, [])

  const channelsLis = channelsObj.map( (channel, i) => <li key={i}>{channel.title}</li>)

  const createChannel = () => {

  }
  return (
    <>
      <h1>Channels Page ;)</h1>
      <ul>{channelsLis}</ul>
      <ChannelCreationForm/>
    </>
  )
}