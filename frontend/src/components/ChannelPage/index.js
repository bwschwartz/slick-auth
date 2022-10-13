import { showChannels } from '../../store/channels'
import { useDispatch, useSelector } from 'react-redux'



export const ChannelPage = () => {

  const dispatch = useDispatch();
  const channels = useSelector( (state) => state.channels )
  return (
    <>
      <h1>Channels Page Bitch</h1>
      {/* <ul>{channels}</ul> */}
    </>
  )
}