import { fetchChannels } from '../../store/channels'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
// import NavBar from '../NavBar'

export const ChannelPage = () => {

  const dispatch = useDispatch();
  const channelsList = useSelector(state => state.channels.channels)

  console.log(channelsList)

  // console.log(channelsList);

  useEffect(() => {
   dispatch(fetchChannels())
  }, [])

  const channelsArr = channelsList.map((channel, id) => (<li key={id}>{channel.title}</li>))

  return (
    <>
      <h1>Channels Page</h1>

      <ul>{channelsArr}</ul>
    </>
  )
}