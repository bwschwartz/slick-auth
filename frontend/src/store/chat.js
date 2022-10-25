import csrfFetch from './csrf'

const RECEIVE_MESSAGES = 'chat/RecieveMessages'

const receiveMessages = (messages) => {
  return {
    type: RECEIVE_MESSAGES,
    messages
  }
}
export const fetchMessages = () => async (dispatch) => {
  const res = await csrfFetch('/api/messages');
  const data = await res.json();
  dispatch(receiveMessages(data))
}

export const chatReducer = (state={}, action ) => {
  const nextState = {...state}
  switch (action.type) {
    case RECEIVE_MESSAGES:
      return {...state, ...action.messages}

    default:
      return state;
  }

}