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
  const {description, title, owner_id} = channel;
  const res = await csrfFetch('/api/channels', {
    method: 'POST',
    body: JSON.stringify({description, title, owner_id})
  })
  const data = await res.json();
  dispatch(addChannel(data))
  return res;
}

export const channelsReducer = (state={}, action) => {
  switch (action.type) {
    case RECEIVE_CHANNELS:
      return {...state, ...action.channels}
    case ADD_CHANNEL:
      return {...state, ...action.channel}
    default:
      return state;
  }
}

