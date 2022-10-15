import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import * as channelActions from '../../store/channels'

export const ChannelCreationForm = () => {
  const dispatch = useDispatch()
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');

  const owner_id = useSelector( state => state.session.user? state.session.user.id : null )

  const handleSubmit = (e) => {
    e.preventDefault();
     dispatch(channelActions.createChannel({description, title, owner_id}))
  }

  return (
    <>
      <h2>Create a channel, friendo </h2>
      <form onSubmit={ handleSubmit }>

      <label>Title</label>
            <input  className="credential" type="text"
            placeholder=" Dan "
            value={ title }
            onChange = { (e) => setTitle(e.target.value) } />

      <label>Description (optional)</label>
          <input type="text"
            placeholder="   y wi <3 2 h8 DAN"
            value={ description }
            onChange = { (e) => setDescription(e.target.value) } />
          <input type="submit" value="Create Channel" id="form-button"/>

      </form>
    </>
  )
}