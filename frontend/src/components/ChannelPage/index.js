import { useEffect, useCallback, useState, createRef } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Split from 'react-split'
import { fetchChannels } from '../../store/channels'
import './ChannelPage.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const ChannelPage = () => {
  useEffect (()=> {
    dispatch(fetchChannels())
  }, [])

  const dispatch = useDispatch();
  const channelsObj = useSelector( (state) => state.channels ? Object.values(state.channels) : [] )
  // const channelsLis = channelsObj.map( (channel, i) => <li key={i}># &nbsp; {channel.title} </li>)
  const channelsLis = channelsObj.map( (channel, i) => <li key={i}>
  <i className="fa-solid fa-hashtag"/> &nbsp; &nbsp;
  {channel.title} </li>)



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


  const [dropMenuBool, setDropMenuBool] = useState(true);
  const dropMenu = () => {
    setDropMenuBool( curr => !curr)
  }

  return (
    <>
    <div className="split-container">
    <Split className="split"  minSize={[0, 0]} snapOffset={250} gutterSize={1}
    onDrag={ () => setOnGutter(current => !current) }>
      <div ref={channelsDivRef}>
        {width &&
        <>
        <div id="channels-menu-label">
          <button id="drop-button"
            onClick={dropMenu}>
            <i className={dropMenuBool ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right" }>
            <span id={dropMenuBool ? "channels-h5-down" : "channels-h5-right"}>&nbsp;Channels</span></i>
          </button>

        </div>

        {dropMenuBool && <div id="channels-component">
            <ul id="channel-list">{channelsLis}</ul>
        </div>}
        </>}

      </div>

      <div id="other-component">
      </div>
    </Split>

    </div>
    </>
  )
}