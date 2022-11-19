import { useEffect } from 'react'
import consumer from '../../consumer';

const Room = (props) => {
  consumer.subscriptions.create("RoomChannel", {
    connected() {
      console.log("you are my soulmate")
    },

    disconnected() {

    },

    received(data) {

    }
  })
  return (
    <></>
  )
}

export default Room;