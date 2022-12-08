import { useSelector } from 'react-redux'
import { useState } from 'react'
import './Messages.css'
const Messages = () => {
  const messages = useSelector(state => state.channels.currentChannel? state.channels.currentChannel.messages : null)
  const channelUsers = useSelector(state => state.channels.currentChannel? state.channels.currentChannel.users : null)


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
      meridiem = 'PM';
    }
    return hours + ':' + minutes + ' ' + meridiem;
  }


  const checkIfToday = (date) => {
    const todaysDate = new Date()
    if (date.getMonth() !== todaysDate.getMonth() || date.getDay() !== todaysDate.getDay() || date.getYear() !== todaysDate.getYear() ) return false;
    return true;
  }

  const getDateWithSuffix = (date) => {
    const sts = [1, 21, 31]
    const nds = [2, 22]
    const rds = [3, 23]
    if (sts.includes(date)) {
      return date + "st"
    } else if (nds.includes(date)) {
      return date + "nd"
    } else if (rds.includes(date)) {
      return date + "rd"
    } else {
      return date + "th"
    }

  }

  const getDate = (created_at) => {
    const jDate = new Date(created_at)
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let dayName = days[jDate.getDay()]
    if (checkIfToday(jDate)) {
      dayName = "Today"
    }

    let outDate = dayName + ", " + months[jDate.getMonth()] + " " + getDateWithSuffix(jDate.getDate())
    return outDate
  }


  const shouldGetDate = (created_at, channelId) => {
    const jDate = new Date(created_at)
    let outDate = String(jDate.getDay()) + String(jDate.getMonth()) + String(jDate.getDate())+String(channelId)
    // console.log("in shoudl get date", new Date())
    if (outDate !== localStorage.getItem("usedDate")) {
      localStorage.setItem("usedDate", outDate);
      return true
    } else {
      return false
    }
  }

  // console.log("messages before sorting", messages)

  const sortedMessages = messages?.sort(( a,  b ) => a.id-b.id ); //this is hacky, need to sort by created at

  // console.log(sortedMessages)


  const messagesLis = sortedMessages?.map((message, i)=>
  <li id="message" key={i}>
    { (shouldGetDate(message.created_at, message.channel_id) || i===0) &&
        <div id="message-date">
          <div id="date-ruler-left"/>
            <span className="date-box">{getDate(message.created_at, message.channel_id)}</span>
          <div id="date-ruler-right"/>
      </div> }

    <div className="message-content-and-info">
    {/* <div className="message-pic"> */}
    {channelUsers[message.user_id]?.photoUrl?
      <img className="message-pic" src={channelUsers[message.user_id]?.photoUrl}/> :

      <i id="default-prof"  className="fa-solid fa-user message-pic fa-2xl"></i>

    }
    {/* </div> */}

      <div id="not-date">
        <div id="message-user-info">
          { channelUsers[message.user_id]?.username ? channelUsers[message.user_id]?.username : channelUsers[message.user_id]?.email } &nbsp;
          <span id="message-time">
            {getTime(message.created_at)}
          </span>
        </div>

        <div id="message-content">
          {message.content}
        </div>
      </div>
    </div>



  </li>

  )


  return (
    <>
     <ul>{messagesLis}</ul>
     <div id="messages-list-bottom"></div>

    </>
  )
}

export default Messages