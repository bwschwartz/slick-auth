import csrfFetch from './csrf'

const RECEIVE_CHANNELS = 'channels/ReceiveChannels';
const receiveChannels = (channels) => {
  return {
    type: RECEIVE_CHANNELS,
    channels
  }
}
export const fetchChannels = () => async (dispatch) => {
  const res = await csrfFetch('/api/channels');
  const data = await res.json();
  dispatch(receiveChannels(data))
}

const RECEIVE_CHANNEL = 'channels/ReceiveChannel';
const receiveChannel = (channel) => {
  return {
    type: RECEIVE_CHANNEL,
    channel
  }
}

const shapeChannelUsers = (inShape) => {
  const outShape = {}
  for (let i=0; i<inShape.length; i++) {
    outShape[Object.keys(inShape[i])[0]] = inShape[i][Object.keys(inShape[i])[0]]
  }
  return outShape
}
export const fetchChannel = (channelId) => async (dispatch) => {
  const res = await csrfFetch(`/api/channels/${channelId}`);
  let data = await res.json();
  console.log("data in fetch channel", shapeChannelUsers(data.currentChannel.users))
  data.currentChannel.users = shapeChannelUsers(data.currentChannel.users)
  dispatch(receiveChannel(data));
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

const REMOVE_CHANNELS = 'channels/RemoveChannels'
const removeChannels = () => {
  return {
    type: REMOVE_CHANNELS
  }
}
export const clearChannels = () => async(dispatch) => {
  console.log("in clearChannelss")
  dispatch(removeChannels())
}

export const channelsReducer = (state={}, action) => {
  const nextState = {...state};

  switch (action.type) {
    case RECEIVE_CHANNELS:
      return {...state, ...action.channels}
    case RECEIVE_CHANNEL:
      return{...state, ...action.channel}
    case ADD_CHANNEL:
      return {...state, ...action.channel}
    case EDIT_CHANNEL:
      nextState[action.channel.id] = {...action.channel};
      return nextState;
    case REMOVE_CHANNEL:
      delete nextState[action.channelID];
      return nextState;
    case REMOVE_CHANNELS:
      return {};
    default:
      return state;
  }
}

