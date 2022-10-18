import { useDispatch, useSelector } from 'react-redux';
import { useState, createRef } from 'react';
import * as channelActions from '../../store/channels'

export const ChannelForm = ( { onClose }) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');

  const owner_id = useSelector( state => state.session.user? state.session.user.id : null )

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    dispatch(channelActions.createChannel({description, title, owner_id}))
  }

  return (
    <>
    <div>
      <h2>Create a channel, friendo </h2>
      <p>Channels are where your team communicates. They're best when organized around a topic &mdash; #dan, for example.</p>
      <form onSubmit={ handleSubmit }>

      <label>Title</label>
            <input  className="credential" type="text"
            placeholder="  e.g. #dan "
            value={ title }
            onChange = { (e) => setTitle(e.target.value) } />

      <label>Description <span>(optional)</span></label>
          <input type="text"
            placeholder="   y wi <3 2 h8 DAN"
            value={ description }
            onChange = { (e) => setDescription(e.target.value) } />
          <span id="whats-it-about">What's this channel about?</span>
          <input
          type="submit" value="Create Channel" id="form-button"/>

      </form>
      </div>
    </>
  )
}