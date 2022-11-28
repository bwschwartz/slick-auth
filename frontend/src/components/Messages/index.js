
import { useSelector } from 'react-redux'
import './Messages.css'
const Messages = () => {
  const messages = useSelector(state => state.channels.currentChannel? Object.values(state.channels.currentChannel.messages) : null)
  const channelUsers = useSelector(state => state.channels.currentChannel? Object.values(state.channels.currentChannel.users) : null)

  const getTime = (created_at) => {
    const timeStr = created_at.split("T")[1].slice(0,5);
    let [hours, minutes] = timeStr.split(":");
    let meridiem = 'AM';
    hours = parseInt(hours) -5;
    if (hours > 12) {
      hours = parseInt(hours) - 12;
      meridiem = 'PM';
    } else if (hours < 0) {
      hours = 12 + hours;
    }
    return hours + ':' + minutes + ' ' + meridiem;
  }


  const messagesLis = messages?.map((message, i)=>
  <li id="message" key={i}>
    <div>
      <div id="message-user-info">
        {channelUsers[message.user_id]?.email}
      </div>

      <div id="message-time">
        {getTime(message.created_at)}
      </div>
      <div>
        {message.content}
      </div>

    </div>

  </li>)



  return (
    <>
     <ul>{messagesLis}</ul>
     <div id="messages-list-bottom"></div>

    </>
  )
}

export default Messages