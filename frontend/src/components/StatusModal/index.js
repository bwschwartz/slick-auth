import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Modal } from '../../context/Modal';
import { updateUser } from '../../store/session'
import { fetchChannel } from '../../store/channels'
import ChatContext  from '../../context/ChatContext'
import './StatusModal.css'

export const StatusModal = ({status, setStatus}) => {
  const user = useSelector(state => state.session.user? state.session.user : null);
  const userId = user?.id;
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  // const [status, setStatus] = useState(user?.status);

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
    formData.append('user[status]', status);
    formData.append('user[id]', userId);
    dispatch(updateUser(formData));
    setShowModal(false);
  }

  return(<>
          <div id="set-status" className="prof-component-edit" onClick={ prepareModal }>
          Set a status
          </div>

          {showModal &&
            <Modal onClose = { onClose } type={ "status" }>
              <div id="edit-prof-title">Set a status</div>

            <div>

              <div >
                <form id="edit-prof-form" className="status-input">
                  <input className="prof-edit-attr"
                    value= { status }
                    onChange={ e => setStatus(e.target.value) }
                  />
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
