
import { useSelector } from 'react-redux'
import { useState } from 'react'
import './Messages.css'
const Messages = () => {
  const messages = useSelector(state => state.channels.currentChannel? Object.values(state.channels.currentChannel.messages) : null)
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

  const getDate = (created_at, channelId) => {
    const jDate = new Date(created_at)
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let dayName = days[jDate.getDay()]
    if (checkIfToday(jDate)) {
      dayName = "Today"
    }

    let outDate = dayName + ", " + months[jDate.getMonth()] + " " + getDateWithSuffix(jDate.getDate())
    if (outDate+channelId != localStorage.getItem("usedDate")) {
      localStorage.setItem("usedDate", outDate+channelId);
      console.log("setting storage in get date", outDate+channelId)
    } else {
      console.log("returning false in getDate", outDate+channelId)
      return false
    }
    return outDate
  }


  const shouldGetDate = (created_at, channelId) => {
    // console.log("in should get date")
    const jDate = new Date(created_at)
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let dayName = days[jDate.getDay()]
    if (checkIfToday(jDate)) {
      dayName = "Today"
    }
    let outDate = dayName + ", " + months[jDate.getMonth()] + " " + getDateWithSuffix(jDate.getDate())
    // console.log("outDate is", outDate+channelId);
    // console.log('stored date is', localStorage.getItem("usedDate") )
    if (outDate+channelId != localStorage.getItem("usedDate")) {
      console.log("returning true from should get date")
      return outDate
    } else {
      console.log("returning false from should get date")
      return false
    }
  }


  const messagesLis = messages?.map((message, i)=>
  <li id="message" key={i}>
    { shouldGetDate(message.created_at, message.channel_id) &&
        <div id="message-date">
          <div id="date-ruler-left"/>
            <span className="date-box">{getDate(message.created_at, message.channel_id)}</span>
          <div id="date-ruler-right"/>
      </div> }

    <div className="message-content-and-info">
    {/* <div className="message-pic"> */}
    <img className="message-pic" src={channelUsers[message.user_id]?.photoUrl}/>
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