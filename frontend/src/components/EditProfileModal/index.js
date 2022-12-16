import React, { useState, useEffect, dispatch } from 'react';
import { useSelector } from 'react-redux'
import { Modal } from '../../context/Modal';
import { updateUser } from '../../store/user'
import './EditProfileModal.css'

export const EditProfileModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const userId = useSelector(state => state.session.user? state.session.user.id : null)

  const onClose = () => {
    setShowModal(false)
  }

  const prepareModal = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShowModal(true)
  }

  const handleFile = e => {
    const file = e.currentTarget.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setPhotoFile(file);
        setPhotoUrl(fileReader.result);
      };
    }
    // setPhotoFile(file);
    handleSubmit(e);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    if (photoFile) {
      formData.append('user[photo]', photoFile)
    }
    formData.append('user[id]', userId)
    updateUser(formData)
  }

  const photoPreview = photoUrl ? <img src={photoUrl} alt="" style={{width:"100%", height:"100%"}} /> : null;

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

                <form id="edit-pic-form" onSubmit={handleSubmit}>
                  <label>Profile Photo</label>
                  <div id="pic-placeholder">{photoPreview}</div>


                  <label id="wrapper-photo-button" htmlFor="photo-file-input">Upload Photo
                    <input id="photo-file-input" type="file" onChange={handleFile}/>
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
