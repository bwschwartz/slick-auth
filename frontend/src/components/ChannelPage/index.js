import { useEffect, useCallback, useState, createRef, useContext } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Split from 'react-split'
import { fetchChannels } from '../../store/channels'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal } from '../../context/Modal'
import { ChannelFormModal } from '../ChannelCreationModal'
import { ChannelUpdateFormModal } from '../ChannelUpdateModal'
import ChatContext  from '../../context/ChatContext'
import './ChannelPage.css'
// import { ChannelForm } from '../ChannelCreationModal/ChannelForm'

export const ChannelPage = () => {
  // const [ messages, setMessages ] = useState([])
  const { consumer } = useContext(ChatContext);

  const renderMessage = (data) => {
    return "<p> <b>" + data.user + ": </b>" + data.message + "</p>";
  }

  const setUpChat = () => {
    consumer.subscriptions.create({channel:'MessagesChannel'})
  }

  useEffect (()=> {
    dispatch(fetchChannels());
    document.getElementById("message-box").focus();
    setUpChat()
  }, [])

  const [channelDisplayName, setChannelDisplayName] = useState(false)

  const showChannel= (e) => {
    // document.getElementById("message-box").focus();
    console.log("in show channel")
    setChannelDisplayName((e.target.innerText).trim())
  }

  const dispatch = useDispatch();
  const channelsObj = useSelector( (state) => state.channels ? Object.values(state.channels) : [] )
  const channelsLis = channelsObj.map( (channel, i) =>
  <li key={i}  id={channel.id} className={channel.title}onClick={showChannel}>
    <i className="fa-regular fa-hashtag"/>
      &nbsp; &nbsp;
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

  const handleSubmit = () => {

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
              <h1> messages go here</h1>
            </div>

            <div id="send-message-container">
              <div className="chat-styling-icons">
                <div className="style-icon">
                  <i class="fa-sharp fa-solid fa-bold fa-xs"/>
                </div>
                <div className="style-icon">
                  <i class="fa-solid fa-italic fa-xs"/>
                </div>

                <div className="style-icon">
                  <i class="fa-solid fa-strikethrough fa-xs"/>
                </div>
              </div>


              <div id="messagebox-and-plane">
                <form onSubmit={handleSubmit} id="message-form">
                  <input id="message-box" placeholder={channelDisplayName && `Message #${channelDisplayName}`}/>
                </form>
                <div id= "plane">
                  <i className="fa-solid fa-paper-plane fa-lg"></i>
                </div>

              </div>

              {/* <input id="message-box" placeholder={`Message #${channelDisplayName}`}/>

              <div id= "send-message-icon">
                <i className="fa-solid fa-paper-plane fa-lg"></i>
              </div> */}

            </div>
          </div>


        </div>

        </div>

      </Split>

    </div>
    </>
  )
}