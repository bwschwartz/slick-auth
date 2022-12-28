import React, { useState, useEffect, useSelector, dispatch} from 'react';
import { ChannelUpdateForm } from './ChannelUpdateForm';
import { Modal } from '../../context/Modal';
import './ChannelUpdateModal.css'


export const ChannelUpdateFormModal = () => {
  const [showModal, setShowModal] = useState(false)
  const [channelName, setChannelName] = useState('')
  const [channelID, setChannelID] = useState('');

  useEffect(()=>{
    if (channelName !=='' && channelID !=='') setShowModal(true)
  }, [channelName])

  const prepareModal = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setChannelID(e.target.parentElement.parentElement.parentElement.id)
    setChannelName(e.target.parentElement.parentElement.innerText)
    if (channelName !=='' && channelID !=='') setShowModal(true)
  }

  const onClose = () => {
    setShowModal(false)
  }

  return (<>
   <button
    className="drop-button clickable-pencil"
    onClick={ prepareModal }>
        <i id="pencil" className="fa-solid fa-pencil "/>
   </button>

      {showModal && (
        <Modal onClose={onClose} type="channel-update">
          <ChannelUpdateForm
          channelID={channelID}
          channelName={channelName}
          onClose={ () => {setShowModal(false)} }
          />
        </Modal>
      )}
  </>)
}
