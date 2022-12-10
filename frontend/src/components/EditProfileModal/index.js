import React, { useState, useEffect, useSelector, dispatch} from 'react';
import { Modal } from '../../context/Modal';
import './EditProfileModal.css'



export const EditProfileModal = () => {
  const [showModal, setShowModal] = useState(false)


  const onClose = () => {
    setShowModal(false)
  }

  const prepareModal = (e) => {
    console.log("logging a click bitch")
    e.stopPropagation();
    e.preventDefault();
    setShowModal(true)
  }

  return(<>
          <div className="prof-component-edit" onClick={ prepareModal }><span>Edit</span></div>

          {showModal &&
            <Modal onClose = { onClose } id="profile-edit-modal">
            <div id="prof-modal-container">
              <div id="edit-prof-title">Edit your profile</div>
              <hr id="modal-hr"/>
            </div>
            </Modal>
          }
  </>)
}
