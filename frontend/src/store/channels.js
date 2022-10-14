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

export const channelsReducer = (state={}, action) => {
  switch (action.type) {
    case RECEIVE_CHANNELS:
      return {...state, ...action.channels}
    default:
      return state;
  }
}

