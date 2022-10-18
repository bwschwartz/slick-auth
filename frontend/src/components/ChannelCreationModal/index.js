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
   {/* <svg id= "svg-plus"><path
   fill="white" d="M14 2H16V3H14V5H13V3H11V2H13V0H14V2Z"></path></svg> */}
   {/* <svg><path fill="white" fill-opacity="0.0" d="m0 0l960.0 0l0 720.0l-960.0 0z" fill-rule="evenodd"/><path fill="white" fill-opacity="0.0" d="m479.92413 354.0l0 12.125977" fill-rule="evenodd"/><path stroke="white" stroke-width="2.0" stroke-linejoin="round" stroke-linecap="butt" d="m479.92413 354.0l0 12.125977" fill-rule="evenodd"/><path fill="white" fill-opacity="0.0" d="m474.0 360.08243l12.125977 0" fill-rule="evenodd"/><path stroke="white" stroke-width="2.0" stroke-linejoin="round" stroke-linecap="butt" d="m474.0 360.08243l12.125977 0" fill-rule="evenodd"/></svg> */}
     <i className="fa-light fa-plus fa-xl"/>
   </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ChannelForm onClose={() => {
            console.log("onClose")
            setShowModal(false)}}/>
        </Modal>
      )}
  </>)
}

// export default ChannelFormModal;