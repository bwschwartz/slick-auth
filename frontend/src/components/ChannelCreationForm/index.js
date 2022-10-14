import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import * as channelActions from '../../store/channels'

export const ChannelCreationForm = () => {
  const dispatch = useDispatch()
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');

  const owner_id = 1;

  const handleSubmit = (e) => {
    e.preventDefault();
    // debugger
    dispatch(channelActions.createChannel({description, title, owner_id}))
    // debugger
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

      <label>Description</label>
          <input type="text"
            placeholder=" Reasons wii <3 to h8 Dan"
            value={ description }
            onChange = { (e) => setDescription(e.target.value) } />



          <input type="submit" value="Create Channel" id="form-button"/>

      </form>
    </>
  )
}