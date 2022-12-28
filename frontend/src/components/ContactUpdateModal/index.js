import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Modal } from '../../context/Modal';
import { updateUser } from '../../store/session'
import { fetchChannel } from '../../store/channels'
import ChatContext  from '../../context/ChatContext'

export const ContactUpdateModal = ({ phone, setPhone }) => {
  const user = useSelector(state => state.session.user? state.session.user : null);
  const userId = user?.id;
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const onClose = () => {
    setShowModal(false);
  }

  const prepareModal = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShowModal(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('user[id]', userId);
    formData.append('user[phone]', phone);
    dispatch(updateUser(formData));
    setShowModal(false);
  }

  return(
  <>
          <div className="prof-component-edit" onClick={ prepareModal }><span>Edit</span></div>

          {showModal &&
            <Modal onClose = { onClose } type={ "contact" }>
              <div id="edit-prof-title">Edit contact information</div>

            <div>
              <div>
              <div></div>
                <form id="edit-prof-form" className="status-input">

                <div className="contact-label" style={{fontWeight:"bold"}}>
                <i class="fa-solid fa-lock fa-sm" id="lock"></i>
                Email Address</div>
                <input className="prof-edit-attr"
                id="locked-email"
                readOnly="true"
                value={user.email}
                />

                <div className="contact-label">Phone</div>
                <input className="prof-edit-attr"
                  value= { phone }
                  onChange={ e => setPhone(e.target.value) }/>

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
  </>
  )
}
