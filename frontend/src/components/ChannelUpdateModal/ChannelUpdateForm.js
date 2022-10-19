import { useDispatch, useSelector } from 'react-redux';
import { useState, createRef } from 'react';
import * as channelActions from '../../store/channels'



export const ChannelUpdateForm = ( { onClose, channelName }) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  console.log(channelName)

  const owner_id = useSelector( state => state.session.user? state.session.user.id : null )

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    dispatch(channelActions.updateChannel({description, title, owner_id}))
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
            placeholder="   y wi <3 2 h8 DAN"
            value={ description }
            onChange = { (e) => setDescription(e.target.value) } />
          <span id="whats-it-about">What's this channel about?</span>
          <input
          type="submit" value="Update Channel" id="form-button"/>
      </form>
      </div>
    </>
  )
}