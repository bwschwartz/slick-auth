import { useEffect, useCallback, useState, createRef } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Split from 'react-split'
import { fetchChannels } from '../../store/channels'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ChannelPage.css'

import { Modal } from '../../context/Modal'
import { ChannelFormModal } from '../ChannelCreationModal'
import { ChannelUpdateFormModal } from '../ChannelUpdateModal'
// import { ChannelForm } from '../ChannelCreationModal/ChannelForm'

export const ChannelPage = () => {
  useEffect (()=> {
    dispatch(fetchChannels())
  }, [])

  const dispatch = useDispatch();
  const channelsObj = useSelector( (state) => state.channels ? Object.values(state.channels) : [] )
  const channelsLis = channelsObj.map( (channel, i) => <li key={i}  id={channel.id}>

    <div>

    </div>
    <i className="fa-regular fa-hashtag"/> &nbsp; &nbsp;
    <div className ="title-and-pencil"> {channel.title}
    <ChannelUpdateFormModal/>
    </div>
   </li>)

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
    setDropMenuBool(curr => !curr)
  }

  return (
    <>
    <div className="split-container">

    <Split className="split" sizes={[70, 200]} minSize={[0, 0]} snapOffset={230} gutterSize={1}
    onDrag={ () => setOnGutter(current => !current) }>


      <div ref={channelsDivRef}>
      <div id="server-heading">
      <h3 id="server-name">Google Magenta&nbsp;
      <i className="fa-solid fa-angle-down"/>
      </h3>
      <div id="circle-around-pen">
        <i className="fa-solid fa-pen-to-square"/>
      </div>
      </div>

        {width &&

        <>
        <div id="channels-menu-label">
          <button className="drop-button"
                  onClick={dropMenu}>
            <i className={ dropMenuBool ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right" } id="caret">
            <span id={ dropMenuBool ? "channels-h5-down" : "channels-h5-right" }>&nbsp;Channels</span></i>
          </button>

        <ChannelFormModal/>

        </div>

        {dropMenuBool && <div id="channels-component">
            <ul className="channel-list">{channelsLis}</ul>
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