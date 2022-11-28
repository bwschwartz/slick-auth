import { useEffect, useCallback, useState, createRef, useContext } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Split from 'react-split'
import { fetchChannels, fetchChannel } from '../../store/channels'
import { createMessage, receiveMessage } from '../../store/messages'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Messages from '../Messages'
import { Modal } from '../../context/Modal'
import { ChannelFormModal } from '../ChannelCreationModal'
import { ChannelUpdateFormModal } from '../ChannelUpdateModal'
import ChatContext  from '../../context/ChatContext'
import './ChannelPage.css'
import ActionCable from 'actioncable'
// import { ChannelForm } from '../ChannelCreationModal/ChannelForm'

export const ChannelPage = () => {
  const dispatch = useDispatch();
  const consumer = ActionCable.createConsumer("ws://localhost:5000/cable");
  const currentUserId = useSelector( state => state.session.user ? state.session.user.id : null)

  useEffect (()=> {
    dispatch(fetchChannels());
    // dispatch(fetchMessages());
    // document.getElementById("message-box")?.focus();
  }, [])

  const [channelDisplayName, setChannelDisplayName] = useState(false)
  const [currentChannelId, setCurrentChannelId] = useState(null)
  const [messageContent, setMessageContent] = useState('')

  const changeChannel= (e) => {
    e.stopPropagation();
    const channel = e.currentTarget
    if (channel.id !== currentChannelId) {
      setChannelDisplayName((channel.innerText).trim())
      dispatch(fetchChannel(channel.id))
      setCurrentChannelId(channel.id)
    }
    setTimeout(() => {

      document.getElementById("messages-list-bottom").scrollIntoView(false)
    }, 100
    )
  }
  //enter room and subscribe
  useEffect(() => {
    let subscription = null
    if(currentChannelId) {
      const subscription = consumer.subscriptions.create(
        { channel: "ChannelsChannel", id: currentChannelId },
        { received: (message) => {
          dispatch(receiveMessage(message))
          dispatch(fetchChannel(currentChannelId))
        }
           }
      );
    }
    return () => subscription?.unsubscribe();
  }, [currentChannelId])

  const channelsObj = useSelector( (state) => state.channels ? Object.values(state.channels) : [] )
  const channelsLis = channelsObj.map( (channel, i) =>
  <li key={i}  id={channel.id} className={channel.title} onClick={changeChannel}>
    <i className="fa-regular fa-hashtag"/>
      &nbsp; &nbsp;
    <div className ="title-and-pencil"> {channel.title}
      <ChannelUpdateFormModal/>
    </div>
  </li> )

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

  const handleSubmit = (e) => {
    e.preventDefault();
    createMessage({ content: messageContent, channelId: currentChannelId, userId: currentUserId });
    setMessageContent('')
  }

  return (
    <>
    <div className="split-container">

      <Split className="split" sizes={[44, 200]} minSize={[0, 0]} snapOffset={230} gutterSize={5} onDrag={ () => setOnGutter(current => !current) }>
        <div id="channel-bar" ref={channelsDivRef}>
          <div className="server-heading">
            <h3 className="server-name">A Real Workplace&nbsp;
              <i className="fa-solid fa-angle-down"/>
            </h3>

        <div id="circle-around-pen">
          <i className="fa-solid fa-pen-to-square"/>
        </div>
        </div>

          {width &&
          <>
          <div id="channels-split-left">
            <div id="channels-menu-label">
              <button className="drop-button"
                      onClick={dropMenu}>
                <i className={ dropMenuBool ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right" } id="caret">
                <span id={ dropMenuBool ? "channels-h5-down" : "channels-h5-right" }>&nbsp;Channels</span></i>
              </button>
              <ChannelFormModal/>
            </div>

            {dropMenuBool && <div id="channels-component">
                <ul className="channel-list">
                  {channelsLis}
                </ul>
            </div>}
          </div>
          </>}

        </div>

        <div id="other-component">
          <div className="server-heading other">
            <h3 className="channel-name"> {channelDisplayName && <i id="channel-name-hash" className="fa-regular fa-hashtag fa-lg"/>} {channelDisplayName}&nbsp;
            {channelDisplayName &&  <i className="fa-solid fa-angle-down"/>}
            </h3>
          <div id="circle-around-pen">
            <i className="fa-solid fa-pen-to-square"/>
          </div>

        </div>


        <div id="chat-container">
          <div id="messages-container">
            <div id="messages-list">
              <Messages/>
            </div>
          </div>
          { channelDisplayName && <div id="send-message-container">
              <div className="chat-styling-icons">
                <div className="style-icon">
                  <i className="fa-sharp fa-solid fa-bold fa-xs"/>
                </div>
                <div className="style-icon">
                  <i className="fa-solid fa-italic fa-xs"/>
                </div>

                <div className="style-icon">
                  <i className="fa-solid fa-strikethrough fa-xs"/>
                </div>
              </div>

              <div id="messagebox-and-plane">
                <form id="message-form"onSubmit={handleSubmit}>
                  <textarea id="message-box"
                  placeholder={ channelDisplayName ? `Message #${channelDisplayName}` : undefined }
                  onChange={ e => setMessageContent(e.target.value) }
                  onKeyDown={ e => {
                  if (e.code === 'Enter' && !e.shiftKey) {
                  handleSubmit(e); }}}
                  value={messageContent}
                  />
                </form>
                <div id= "plane">
                  <i className="fa-solid fa-paper-plane fa-lg"></i>
                </div>

              </div>

              {/* <input id="message-box" placeholder={`Message #${channelDisplayName}`}/>

              <div id= "send-message-icon">
                <i className="fa-solid fa-paper-plane fa-lg"></i>
              </div> */}

          </div>}



        </div>


        </div>

      </Split>

    </div>
    </>
  )
}