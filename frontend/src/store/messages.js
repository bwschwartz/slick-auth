import csrfFetch from './csrf'

const RECEIVE_MESSAGE = 'messages/ReceiveMessage'
const receiveMessages = message => {
  return {
    type: RECEIVE_MESSAGES,
    message
  };
};


export const createMessage = message => (
  csrfFetch('/api/messages', {
    method: 'POST',
    data: {message}
  })
)
