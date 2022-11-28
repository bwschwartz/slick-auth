
import { useSelector } from 'react-redux'
import './Messages.css'
const Messages = () => {
  const messages = useSelector(state => state.channels.currentChannel? Object.values(state.channels.currentChannel.messages) : null)

  const getTime = (created_at) => {
    const timeStr = created_at.split("T")[1].slice(1,5) 
    return timeStr

  }
  const messagesLis = messages?.map(message=>
  <li id="message">
    <div>
      {getTime(message.created_at)}
    </div>
    <div>
      {message.content}
    </div>
  </li>)



  return (
    <>
     <ul>{messagesLis}</ul>

    </>
  )
}

export default Messages