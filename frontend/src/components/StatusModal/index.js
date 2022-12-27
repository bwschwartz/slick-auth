import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Modal } from '../../context/Modal';
import { updateUser } from '../../store/session'
import { fetchChannel } from '../../store/channels'
import ChatContext  from '../../context/ChatContext'
import './StatusModal.css'

export const StatusModal = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const user = useSelector(state => state.session.user? state.session.user : null);

  const onClose = () => {
    setShowModal(false);
  }

  const prepareModal = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShowModal(true);
  }

  const handleSubmit = async (e, justPhoto) => {
    e.preventDefault();

    setShowModal(false);
  }

  return(<>
          <div className="prof-component-edit" onClick={ prepareModal }><span>Set a status</span></div>

          {showModal &&
            <Modal onClose = { onClose } type={ "status" }>
              <div id="edit-prof-title">Edit your profile</div>
            <div id="prof-modal-container">

              <div >
                {/* <form id="edit-prof-form">
                  <input className="prof-edit-attr"
                    placeholder={ user.fullName }
                    // value= { fullName }
                    // onChange={ e => setFullName(e.target.value) }
                  />


                </form> */}
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
