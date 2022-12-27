import React, { useState } from 'react';
import { ChannelForm } from './ChannelForm';
import { Modal } from '../../context/Modal';


export const ChannelFormModal = () => {
  const [showModal, setShowModal] = useState(false)

  return (<>
   <button

   className="drop-button"
   onClick={() => setShowModal(true)}>
    <div  id="plus">
      <i className="fa-light fa-plus fa-xl"/>

    </div>
   </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} type="channel">
          <ChannelForm onClose={() => {
            console.log("onClose")
            setShowModal(false)}}/>
        </Modal>
      )}
  </>)
}

// export default ChannelFormModal;