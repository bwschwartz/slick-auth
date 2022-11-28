import csrfFetch from './csrf'

const RECEIVE_MESSAGE = 'messages/ReceiveMessage'
export const receiveMessage = message => {
  return {
    type: RECEIVE_MESSAGE,
    message
  };
};

const RECEIVE_MESSAGES = 'messages/ReceiveMessage';
const receiveMessages = messages => {
  return {
    type: RECEIVE_MESSAGES,
    messages
  }
}
export const fetchMessages= (channelId) => async (dispatch) => {
  const res = await csrfFetch(`/api/messages/${channelId}`);
  const data = await res.json();
  dispatch(receiveMessages)
}

export const createMessage = (message) => {
  const res =  csrfFetch(`/api/messages`, {
    method: 'POST',
    body: JSON.stringify({...message })
  })
}

export const messagesReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_MESSAGE:
      return {...state, ...action.message}
    case RECEIVE_MESSAGES:
      return {...state, ...action.messages};
    default:
      return state;
  }
}
