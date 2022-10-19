import React, { useState, useEffect, useSelector } from 'react';
import { ChannelUpdateForm } from './ChannelUpdateForm';
import { Modal } from '../../context/Modal';
import './ChannelUpdateModal.css'


export const ChannelUpdateFormModal = () => {
  const [showModal, setShowModal] = useState(false)
  const [channelName, setChannelName] = useState('')
  const [channelID, setChannelID] = useState('');

  // const channels = useSelector(state => state.channels ? state.channels : null)

  useEffect(()=>{
    if (channelName !=='' && channelID !=='') setShowModal(true)
  }, [channelName])


  const prepareModal = (e) => {
    console.log(`channelID: ${channelID}`)
    console.log(channelName)
    setChannelID(e.target.parentElement.parentElement.parentElement.id)
    setChannelName(e.target.parentElement.parentElement.innerText)
    if (channelName !=='' && channelID !=='') setShowModal(true)
  }

  return (<>
   <button
    className="drop-button clickable-pencil"
    onClick={ prepareModal }>
        <i id="pencil" className="fa-solid fa-pencil "/>
   </button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ChannelUpdateForm
          channelID={channelID}
          channelName={channelName}
          onClose={() => {setShowModal(false)}}
          />
        </Modal>
      )}
  </>)
}
