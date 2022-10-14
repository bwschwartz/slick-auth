import { fetchChannels } from '../../store/channels'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export const ChannelPage = () => {

  const dispatch = useDispatch();
  const channelsList = useSelector( state => Object.values(state.channels) )
  // console.log(channelsList);

  useEffect(() => {
   dispatch(fetchChannels())
  }, [])

  const channelsArr = channelsList[0].map((channel, id) => (<li key={id}>{channel.title}</li>))

  return (
    <>
      <h1>Channels Page</h1>
      <ul>{channelsArr}</ul>
    </>
  )
}