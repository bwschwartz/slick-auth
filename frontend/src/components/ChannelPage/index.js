import { useEffect, useCallback, useState, createRef, useContext } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Split from 'react-split'
import { fetchChannels, fetchChannel } from '../../store/channels'
import { createMessage, receiveMessage } from '../../store/messages'
import { updateUser } from '../../store/session'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Messages from '../Messages'
import { Modal } from '../../context/Modal'
import { ChannelFormModal } from '../ChannelCreationModal'
import { ChannelUpdateFormModal } from '../ChannelUpdateModal'
import { StatusModal } from '../StatusModal'
import { EditProfileModal } from '../EditProfileModal'
import ChatContext  from '../../context/ChatContext'
import './ChannelPage.css'
import Clock from '../../assets/transparent-clock-right-color.png'
import ActionCable from 'actioncable'

export const ChannelPage = () => {
  const dispatch = useDispatch();
  const consumer = ActionCable.createConsumer("ws://localhost:5000/cable");
  const currentUserId = useSelector( state => state.session.user ? state.session.user.id : null)
  const user = useSelector ( state => state.session.user?.fullName? state.session.user.fullName :  state.session.user?.email )
  const userStatus = useSelector( state => state.session.user ? state.session.user.status : null )
  const [status, setStatus] = useState(userStatus);


  const profPic = useSelector ( state => state.session.user? state.session.user.photoUrl : null )
  const [timeObj, setTimeObj] = useState(new Date())


  useEffect (()=> {
    dispatch(fetchChannels());
    setInterval(() => setTimeObj(new Date()), 6000)
  }, [])
  const [currentChannelId, setCurrentChannelId] = useState(null)
  const [messageContent, setMessageContent] = useState('')

  const { showProfileEdit, setShowProfileEdit, channelDisplayName, setChannelDisplayName, reRenderMessages } = useContext(ChatContext)

  const changeChannel= (e) => {
    e.stopPropagation();
    localStorage.removeItem("usedDate")
    const channel = e.currentTarget
    if (channel.id !== currentChannelId) {
      setChannelDisplayName((channel.innerText).trim())
      dispatch(fetchChannel(channel.id))
      setCurrentChannelId(channel.id)
    }
    setTimeout(() => {
      document.getElementById("messages-list-bottom").scrollIntoView(false)
    }, 400)
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
          setTimeout(() => {
            document.getElementById("messages-list-bottom").scrollIntoView(false)
          }, 300)
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
      <ChannelUpdateFormModal type="channel"/>
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

  const arrayEquals = (arr1, arr2) => {
    return arr1.every((e, i, arr) =>{
       return e === arr2[i]
     })
   }
   const showProf = () => {
     const dims = arrayEquals(showProfileEdit, [20, 80, 0]) ? [20, 50, 30 ] : [20, 80, 0 ]
     setShowProfileEdit(dims)
   }

   const getTime = (dateObj) => {
    let hours  = dateObj.getHours()
    let minutes = dateObj.getMinutes()
    let meridiem = 'AM';
    if (hours > 12) {
      hours = parseInt(hours) - 12;
      meridiem = 'PM';
    } else if (hours === 0) {
      hours = 12;
    } else if (hours < 0) {
      hours = 12 + hours;
      meridiem = 'PM';
    } if (minutes < 10) {
      minutes = '0' + String(minutes)
    }
    return hours + ':' + minutes + ' ' + meridiem;
  }

  const getDateObj = () => {
    return setInterval(()=> {return new Date()}, 1000)
  }

  const removeStatus = (e) => {
    e.preventDefault()
    console.log("removing some shit")
    const formData = new FormData();
    formData.append('user[status]', '')
    formData.append('user[id]', currentUserId)
    setStatus(null);
    dispatch(updateUser(formData))
  }


  return (
    <>
    <div className="split-container">
      <Split className="split" columns={3} sizes={showProfileEdit} expandToMin={false} minSize={[0, 400, 0]} snapOffset={100} gutterSize={3} onDrag={ () => setOnGutter(current => !current) }>
      <>

        <div id="channel-bar" ref={channelsDivRef}>
          <div className="server-heading">
            <h3 className="server-name">A Real Workplace&nbsp;
              <i className="fa-solid fa-angle-down"/>
            </h3>

        <div id="circle-around-pen">
        </div>
        </div>

          {true &&
          <>
          <div id="channels-split-left">
            <div id="channels-menu-label">
              <button className="drop-button"
                      onClick={ dropMenu }>
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
              {channelDisplayName &&  <i id="other-arrow" className="fa-solid fa-angle-down"/>}
            </h3>
          </div>


        <div id="chat-container">

            <div id="messages-container">
              <div id="messages-list">

                <Messages render={reRenderMessages}/>

              </div>
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
          </div>}

        </div>

        {<div id="profile-edit">{ showProfileEdit[2]!==0  &&
        <>
          <div id="profile-title"><div id ="inner-title"> Profile <i className="fa-solid fa-x fa-xs" onClick={e => showProf()}></i></div></div>

          <div id="profile-edit-scrollable">
          <div id="scroll-flex">
          <div id="profile-pic">{profPic? <img src={profPic} style={{width:"100%", height:"100%"}}/> : user[0].toUpperCase()}</div>

<div className="prof-component-edit"><div id="prof-username">{user}</div><span> <EditProfileModal/></span></div>

<div id="availability-status"><span id="profile-avail"></span>Active</div>

{userStatus &&
<div id="status-and-cancel">

 <div id="availability-status"><i class="fa-regular fa-comment-dots speech-bubble fa-xl"/>{userStatus}</div>
 <i class="fa-solid fa-x fa-xs"
  onClick={removeStatus}
 />
</div>
 }

<div id="local-time">
  <img id="clock" src={ Clock }/> &nbsp;
  {getTime(timeObj) + ' local time'}
</div>

<div id="prof-options">
  <div><StatusModal status={status} setStatus={setStatus} /></div>
  <div id="set-status">View</div>
</div>

<hr id="profile-ruler"/>
<div className="prof-component-edit"><div id="contact-info-title">Contact Information</div> <span>Edit</span></div>
<div className="prof-component-edit"><div id="contact-info-title">Contact Information</div> <span>Edit</span></div>
<div className="prof-component-edit"><div id="contact-info-title">Contact Information</div> <span>Edit</span></div>


</div>
          </div>






        </>
        }</div>}
        {/* {showProfileEdit[2] ==0 && <div id="empty-prof"></div>} */}


       {/* {showProfileEdit[2] !==0 && <div style={{width:0}}>shit</div>} */}

       </>
      </Split>
    </div>
    </>
  )
}