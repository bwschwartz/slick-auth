import csrfFetch from './csrf'

const RECEIVE_CHANNELS = 'channels/ReceiveChannel';

const receiveChannels = (channels) => {
  return {
    type: RECEIVE_CHANNELS,
    channels
  }
}

export const fetchChannels = () => async (dispatch) => {
  const res = await csrfFetch('/api/channels');
  const data = await res.json();
  // data.map( channel => channel.id:{channel} )
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
  const { sendDescription, owner_id, sendTitle,  channelID  } = channel;
  const description = sendDescription;
  const title = sendTitle;
  const id = channelID;

  const res = await csrfFetch(`/api/channels/${channelID}`, {
    method: "PATCH",
    body: JSON.stringify({ description, id, title, owner_id})
  })
  const data = await res.json();
  dispatch(editChannel(data))
  return res;
}

const REMOVE_CHANNEL = 'channels/RemoveChannel'
const removeChannel = (channelID) => {
  return {
    type: REMOVE_CHANNEL,
    channelID
  }
}

export const deleteChannel = (channelID) => async (dispatch) => {
  const res = await csrfFetch(`/api/channels/${channelID}`, {
    method: "DELETE"
  })
  dispatch(removeChannel(channelID))
}


export const channelsReducer = (state={}, action) => {
  const nextState = {...state};

  switch (action.type) {
    case RECEIVE_CHANNELS:
      return {...state, ...action.channels}
    case ADD_CHANNEL:
      return {...state, ...action.channel}
    case EDIT_CHANNEL:
      nextState[action.channel.id] = {...action.channel};
      return nextState;
    case REMOVE_CHANNEL:
      delete nextState[action.channelID];
      return nextState;
    default:
      return state;
  }
}

