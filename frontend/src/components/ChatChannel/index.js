import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fetchMessages } from '../../store/chat'
import { useDispatch } from 'react-redux'
import consumer from '../../channels/consumer.js'

export const ChatChannel = () => {
  const dispatch = useDispatch();

  useEffect (() => {
    dispatch(fetchMessages())
  }, [])

  useEffect (() => {
    console.log("effect ran")
    // const subscription = consumer.subscriptions.create(
    //   { channel: 'RoomChannel' },
    //   {
    //     received: message => {
    //       console.log('Received message: ', message);
    //     }
    //   }
    // )
    // consumer.subscriptions.create("RoomChannel", {
    //   connected() {
    //     console.log("hit connection method")
    //   },

    //   disconnected() {

    //   },

    //   received(data) {

    //   }
    // })}
  },[])

  const messages = useSelector(state => state.chats ? Object.values(state.chats) : [])
  const messagesList = messages.map((message, i) => <li key={i} id={message.id}>{message.content}</li>)



  return (
    <>
      <h1> chat Channel </h1>
      <ul>{messagesList}</ul>
    </>
  )
}