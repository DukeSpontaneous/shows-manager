import React from 'react'
import ReactDOM from 'react-dom'

import { modal, closeButton } from './showDescription.css'

const Modal = ComposedComponent => () =>
  ReactDOM.createPortal(
    <div className={modal}>
      <button className={closeButton}>Close</button>
      <ComposedComponent />
    </div>,
    document.getElementById('portal')
  )

const ShowDescription = ({ children }) =>
  <div>
    <h1>ModalWindow</h1>
  </div>

export default Modal(ShowDescription)