import { useEffect, useCallback, useState, createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Split from 'react-split'
import { fetchChannels } from '../../store/channels'
import './ChannelPage.css'

export const ChannelPage = () => {
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

  const dispatch = useDispatch();
  const channelsObj = useSelector( (state) => state.channels ? Object.values(state.channels) : [] )

  useEffect (()=> {
    dispatch(fetchChannels())
  }, [])

  useEffect (() =>{
    console.log(onGutter)
  }, [onGutter])

  const channelsLis = channelsObj.map( (channel, i) => <li key={i}># &nbsp; &nbsp; {channel.title} </li>)

  // const getWidth = async () => {
  //   console.log("getting width");
  //   await setOnGutter(false);
  //   console.log(onGutter)
  // }

  return (
    <>
    <div className="split-container">
    <Split className="split"  minSize={0} snapOffset={250} onDragEnd={() =>  {
      setOnGutter( current => !current );
      console.log("firing on drag end")
      // await console.log(onGutter)
      }}
       >
      <div ref={channelsDivRef}>
        {width &&
        <>
        <h1 style={{color:"green"}}>{width}</h1>
        <div>
           {/* <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet" /> */}
          <i type="caret-right"></i>
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