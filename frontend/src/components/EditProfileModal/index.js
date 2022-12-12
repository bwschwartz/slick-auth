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
              <div id="edit-prof-title">Edit your profile</div>
            <div id="prof-modal-container">
              {/* <hr id="modal-hr"/> */}



              <div id="editable-forms">
                <form id="edit-prof-form">
                  <label className="prof-edit-label">Full name</label>
                  <input className="prof-edit-attr"/>

                  <label>Display name</label>
                  <input className="prof-edit-attr"/>
                  <span>This could be your first name, or a nickname — however you’d like people to refer to you in Slick.</span>

                  <label>Title</label>
                  <input className="prof-edit-attr"/>
                  <span>Let the people know what you do at A Real Workplace</span>
                </form>

                <form id="edit-pic-form" style={{"margin-left":50}}>
                  <label>Profile Photo</label>
                  <div id="pic-placeholder"></div>
                  <label id="wrapper-photo-button" htmlFor="photo-file-input">Upload Photo
                    <input id="photo-file-input" type="file"/>
                  </label>
                </form>
              </div>



              <div id="edit-prof-title">
                <div className="prof-edit-attr" id="cancel-button">Cancel</div>
                <div className="prof-edit-attr" id="save-button">Save Changes</div>
              </div>

              {/* <div>hi</div>
              <div>hi</div>
              <div>hi</div> */}






            </div>

            </Modal>
          }
  </>)
}
