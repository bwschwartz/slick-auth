import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Modal } from '../../context/Modal';
import { updateUser } from '../../store/session'
import ChatContext  from '../../context/ChatContext'
import './EditProfileModal.css'

export const EditProfileModal = () => {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const user = useSelector(state => state.session.user? state.session.user : null)
  const [displayName, setDisplayName] = useState(user.displayName);
  const [fullName, setFullName] = useState(user.fullName);
  const [title, setTitle] = useState(user.title);
  const userId = useSelector(state => state.session.user? state.session.user.id : null)
  const currentProfPic = useSelector(state => state.session.user? state.session.user.photoUrl : null)

  const [showProfPic, setShowProfPic] = useState(currentProfPic)

  const { setReRenderMessages, reRenderMessages } = useContext(ChatContext)


  const onClose = () => {
    setShowModal(false)
  }

  const prepareModal = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShowModal(true)
  }

  const handleFile = async e => {
    e.preventDefault();
    const file = e.currentTarget.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setPhotoFile(file);
        setPhotoUrl(fileReader.result);
      };
    }
  }

  const handleSubmit = async (e, justPhoto) => {
    e.preventDefault();
    const formData = new FormData();
    if (photoFile) {
      formData.append('user[photo]', photoFile)
    }
    formData.append('user[id]', userId)
    formData.append('user[display_name]', displayName)
    formData.append('user[full_name]', fullName)
    formData.append('user[title]', title)
    dispatch(updateUser(formData))
    setReRenderMessages(state => !state)
    setShowModal(false)
  }

  const removePhoto = () => {
    setPhotoFile("delete");
    setPhotoUrl(null);
    setShowProfPic(null);
  }


  const photoPreview = photoUrl ? <img src={photoUrl} alt="" style={{width:"100%", height:"100%", backgroundColor:"blue"}} /> : null;

  return(<>
          <div className="prof-component-edit" onClick={ prepareModal }><span>Edit</span></div>

          {showModal &&
            <Modal onClose = { onClose } id="profile-edit-modal">
              <div id="edit-prof-title">Edit your profile</div>
            <div id="prof-modal-container">

              <div id="editable-forms">
                <form id="edit-prof-form">
                  <label className="prof-edit-label">Full name</label>
                  <input className="prof-edit-attr"
                    placeholder={ user.fullName }
                    value= { fullName }
                    onChange={ e => setFullName(e.target.value)}
                  />

                  <label>Display name</label>

                  <input className="prof-edit-attr"
                    placeholder={ user.displayName }
                    value= { displayName }
                    onChange={ e => setDisplayName(e.target.value)}
                  />

                  <span>This could be your first name, or a nickname — however you’d like people to refer to you in Slick.</span>

                  <label>Title</label>
                  <input className="prof-edit-attr"
                    // placeholder={ user.title }
                    value= { title }
                    onChange={ e => setTitle(e.target.value)}

                  />
                  <span>Let the people know what you do at A Real Workplace</span>
                </form>

                <form id="edit-pic-form" onSubmit={handleSubmit}>
                  <label>Profile Photo</label>
                  <div id="pic-placeholder"
                  >{photoPreview  ||
                    (showProfPic ? <img src={currentProfPic} style={{width:"100%", height:"100%", backgroundColor:"blue"}}/> : user?.displayName[0].toUpperCase())
                   }</div>

                  <label id="wrapper-photo-button" htmlFor="photo-file-input">Upload Photo
                    <input id="photo-file-input" type="file" onChange={handleFile}/>
                  </label>

                  {showProfPic && <div id="remove-photo"
                  onClick={removePhoto}
                  >Remove Photo</div>}

                </form>
              </div>


            </div>


                  <div id="save-and-cancel">
                    <button onClick={handleSubmit}
                    className="prof-edit-attr" id="save-button"
                    >Save Changes</button>
                    <button className="prof-edit-attr" id="cancel-button"
                    onClick={(e)=> setShowModal(false)}

                    >Cancel</button>
                  </div>
            </Modal>
          }
  </>)
}
