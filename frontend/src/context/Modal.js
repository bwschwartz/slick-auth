import { createContext, useRef, useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'
const ModalContext = createContext();

export const ModalProvider = ({ children })  => {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current)
  }, [])

  return (
    <>
      <ModalContext.provider value={value}>
        {children}
      </ModalContext.provider>
      <div ref={modalRef}></div>
    </>

  )
}

export const Modal = ({ onClose, children }) => {
  const modalNode = useContext(ModalContext);

  if (!modalNode) return false;

  return (
    ReactDOM.createPortal(
      <>
      <div id="modal">
        <div id="modal-background"
              onClick={onClose}></div>
        <div id="modal-content"> {children} </div>
      </div>
    </>, modalNode
    )
  )
}