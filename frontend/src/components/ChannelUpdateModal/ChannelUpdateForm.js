import { useDispatch, useSelector } from 'react-redux';
import { useState, createRef } from 'react';
import * as channelActions from '../../store/channels'



export const ChannelUpdateForm = ({ onClose, channelName, channelID }) => {
  const dispatch = useDispatch();
  const [inputDescription, setInputDescription] = useState('');
  const [title, setTitle] = useState('');

  const owner_id = useSelector( state => state.session.user? state.session.user.id : null )
  const stateChannel = useSelector( state => state.channels[channelID]  ? state.channels[channelID] : null )
  // console.log(channelID)
  // console.log(stateChannel)

  const storeDescription = stateChannel ? stateChannel.description : 'Click directly on the pencil pls!'

  const handleSubmit = (e) => {
    const sendTitle = title === '' ? channelName : title
    const sendDescription = inputDescription === '' ? storeDescription : inputDescription
    dispatch(channelActions.updateChannel({sendDescription, sendTitle, channelID, owner_id}))
  }

  return (
    <>
    <div>
      <h2>Update, friendo </h2>
      <form onSubmit={ handleSubmit }>

      <label>Channel Name</label>
            <input  className="credential" type="text"
            placeholder={channelName}
            value={ title }
            onChange = { (e) => setTitle(e.target.value) } />

      <label>Description <span>(optional)</span></label>
          <input type="text"
            placeholder={storeDescription}
            value={ inputDescription }
            onChange = { (e) => setInputDescription(e.target.value) } />
          <span id="whats-it-about">What's this channel about?</span>
          <input
          type="submit" value="Update Channel" id="form-button"/>
      </form>
      </div>
    </>
  )
}