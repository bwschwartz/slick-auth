import React, { useState, useEffect } from 'react';
import { ChannelUpdateForm } from './ChannelUpdateForm';
import { Modal } from '../../context/Modal';


export const ChannelUpdateFormModal = () => {
  const [showModal, setShowModal] = useState(false)
  const [channelName, setChannelName] = useState('')

  useEffect(()=>{
    if (channelName !=='') setShowModal(true)
  },
  [channelName])


  const prepareModal = (e) => {
    setChannelName( e.target.parentElement.parentElement.innerText)
    console.log(`after grabbing: ${channelName}`)
  }

  return (<>
   <button
    id="pencil"
    className="drop-button"
    onClick={ prepareModal }>
        <i id="pencil" className="fa-solid fa-pencil fa-2xs"/>
   </button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ChannelUpdateForm
          channelName={channelName}
          onClose={() => {setShowModal(false)}}
          />
        </Modal>
      )}
  </>)
}
