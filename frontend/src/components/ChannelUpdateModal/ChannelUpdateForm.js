import { useDispatch, useSelector } from 'react-redux';
import { useState, createRef, useContext } from 'react';
import * as channelActions from '../../store/channels'
import ChatContext  from '../../context/ChatContext'


export const ChannelUpdateForm = ({ onClose, channelName, channelID }) => {
  const dispatch = useDispatch();
  const [inputDescription, setInputDescription] = useState('');
  const [title, setTitle] = useState('');

  const owner_id = useSelector( state => state.session.user? state.session.user.id : null );
  const stateChannel = useSelector( state => state.channels[channelID]  ? state.channels[channelID] : null );
  const { setChannelDisplayName } = useContext(ChatContext);

  const storeDescription = stateChannel ? stateChannel.description : 'Click directly on the pencil pls!'

  const handleSubmit = (e) => {
    e.preventDefault();
    const sendTitle = title === '' ? channelName : title
    const sendDescription = inputDescription === '' ? storeDescription : inputDescription
    dispatch(channelActions.updateChannel({sendDescription, sendTitle, channelID, owner_id}))
    onClose();
  }

  const deleteChannel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setChannelDisplayName('')
    dispatch(channelActions.deleteChannel(channelID));
    onClose();
  }

  return (
    <>
    <div>
      <div>Update channel </div>
      <form onSubmit={ handleSubmit }>

      <label>Channel Name</label>
            <input className="credential" type="text"
            placeholder={channelName}
            value={ title }
            onChange = { (e) => setTitle(e.target.value) }
             />

      <div id="description">Description <span>(optional)</span></div>

          <input type="text"
          className="credential"
            placeholder={ storeDescription }
            value={ inputDescription }
            onChange = { (e) => setInputDescription(e.target.value) } />
          <span id="whats-it-about">What's this channel about?</span>
          <input
          type="submit" value="Update Channel" id="channel-form-button"/>
          <br/>
          <button
          type="submit" value="Delete Channel"
          id="delete-channel-button"
          onClick={deleteChannel}>Delete Channel</button>
      </form>
      </div>
    </>
  )
}