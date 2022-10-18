import csrfFetch from './csrf'

const RECEIVE_CHANNELS = 'channels/ReceiveChannel';

const receiveChannels = (channels) => {
  return {
    type: RECEIVE_CHANNELS,
    channels
  }
}

export const fetchChannels = () => async (dispatch) => {
  const res = await csrfFetch('/api/channels')
  const data = await res.json()
  dispatch(receiveChannels(data))
}

const ADD_CHANNEL = 'channels/CreateChannel'
const addChannel = (channel) => {
  return {
    type: ADD_CHANNEL,
    channel
  }
}

export const createChannel = (channel) => async (dispatch) => {
  const { description, title, owner_id } = channel;
  const res = await csrfFetch('/api/channels', {
    method: 'POST',
    body: JSON.stringify({description, title, owner_id})
  })
  const data = await res.json();
  dispatch(addChannel(data))
  return res;
}

const EDIT_CHANNEL = 'channels/EditChannel'
const editChannel = (channel) => {
  return {
    type: EDIT_CHANNEL,
    channel
  }
}

export const updateChannel = (channel) => async (dispatch) => {
  const { description, title, id } = channel;
  const res = await csrfFetch(`/api/channels/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ description, title, id})
  })
  const data = await res.json();
  dispatch(editChannel(data))
  return res;
}


export const channelsReducer = (state={}, action) => {
  switch (action.type) {
    case RECEIVE_CHANNELS:
      return {...state, ...action.channels}
    case ADD_CHANNEL:
      return {...state, ...action.channel}
    case EDIT_CHANNEL:
      const nextState = {...state};
      // console.log(action.channel)
      console.log(action.channel)
      nextState[action.channel.channel.id] = {...action.channel};
      return nextState;
    default:
      return state;
  }
}

