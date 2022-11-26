import csrfFetch from './csrf'

// const RECEIVE_MESSAGE = 'messages/ReceiveMessage'
// const receiveMessages = message => {
//   return {
//     type: RECEIVE_MESSAGES,
//     message
//   };
// };


export const createMessage = (message) => {
  // const { content, channelId, authorId } = message;
  // console.log("where it breaks", channelId)

  const res =  csrfFetch(`/api/messages`, {
    method: 'POST',
    body: JSON.stringify({...message })
  })


}
