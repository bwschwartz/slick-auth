import { useEffect, useCallback, useState, createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Split from 'react-split'
import { fetchChannels } from '../../store/channels'
import './ChannelPage.css'

export const ChannelPage = () => {
  useEffect (()=> {
    dispatch(fetchChannels())
  }, [])

  const dispatch = useDispatch();
  const channelsObj = useSelector( (state) => state.channels ? Object.values(state.channels) : [] )
  const channelsLis = channelsObj.map( (channel, i) => <li key={i}># &nbsp; &nbsp; {channel.title} </li>)


  const useChannelsWidth = (ref, onGutter) => {
    const [channelsWidth, setChannelsWidth] = useState(1);
    useEffect(() => {
      if (ref.current) {
        const w = ref.current.getBoundingClientRect().width
        setChannelsWidth(Math.round(w))
      }
    }, [onGutter])
    return channelsWidth
  }

  const [onGutter, setOnGutter] = useState(true);
  const channelsDivRef = createRef();
  const width = useChannelsWidth(channelsDivRef, onGutter);

  return (
    <>
    <div className="split-container">
    <Split className="split"  minSize={0} snapOffset={250}
    onDrag={ () => setOnGutter(current => !current) }>
      <div ref={channelsDivRef}>
        {width &&

        <>
        {/* <h1 style={{color:"green"}}>{width}</h1> */}
        <div>
          <h5 id="channels-h5">Channels</h5>
        </div>

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