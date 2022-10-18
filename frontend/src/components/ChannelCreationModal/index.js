import React, { useState } from 'react';
import { ChannelForm } from './ChannelForm';
import { Modal } from '../../context/Modal';


export const ChannelFormModal = () => {
  const [showModal, setShowModal] = useState(false)

  return (<>
   <button
   id="plus"
   className="drop-button"
   onClick={() => setShowModal(true)}>
     <i className="fa-light fa-plus fa-xl" />
   </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}
        onSubmit={() => console.log("hi")}>
          <ChannelForm />
        </Modal>
      )}
  </>)
}

// export default ChannelFormModal;