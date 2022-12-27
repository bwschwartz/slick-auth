import { createContext, useRef, useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current)
  }, [])

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef}></div>
    </>
  )
}

export const Modal = ({ onClose, children, type }) => {
  const modalNode = useContext(ModalContext);

  const getContentStyling = (type) => {
    switch(type) {
      case "status":
        return 'status-modal-content';
      case "profile":
        return 'modal-content';
      case "channel":
        return 'channel-modal-content';
      case "channel-update":
        return 'channel-update-modal-content'
      default:
        return null;
    }
  }

  if (!modalNode) return false;

  return (
    ReactDOM.createPortal(
      <>
      <div id="modal">
        <div id="modal-background" onClick={onClose}></div>
        <div id={getContentStyling(type)}> {children} </div>
      </div>
    </>, modalNode
    )
  )
}