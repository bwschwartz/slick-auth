import { useEffect, useState, createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Split from 'react-split'
import { fetchChannels } from '../../store/channels'
import './ChannelPage.css'

const useChannelsWidth = (ref) => {
  const [width, setWidth] = useState('1');
  useEffect(() => {
    if (ref.current) {
      const { current } = ref
      const width = current.getBoundingClientRect().width
      setWidth(Math.round(width))
    }
  }, [ref])
  return width
}

export const ChannelPage = () => {
  const channelsDivRef = createRef();
  const width = useChannelsWidth(channelsDivRef)

  const dispatch = useDispatch();
  const channelsObj = useSelector( (state) => state.channels ? Object.values(state.channels) : [] )

  useEffect (()=> {
    dispatch(fetchChannels())
  }, [])

  const channelsLis = channelsObj.map( (channel, i) => <li key={i}># &nbsp; &nbsp; {channel.title} </li>)

  return (
    <>
    <div className="split-container">
    <Split className="split"  minSize={0} snapOffset={250} >
      <div ref={channelsDivRef}>
        {width &&
        <>
        {/* <h1 style={{color:"green"}}>{width}</h1> */}
          <h5 id="channels-h5">Channels</h5>
          <div id="channels-component">
            <ul id="channel-list">{channelsLis}</ul>
          </div>
        </>}
      </div>

      <div>
      </div>
    </Split>

    </div>
    </>
  )
}