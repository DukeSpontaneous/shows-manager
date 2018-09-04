import React from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router'

import { modal, closeButton } from './showDescription.css'

const Modal = ComposedComponent => ({ history }) =>
  ReactDOM.createPortal(
    <div className={modal}>
      <button className={closeButton} onClick={() => history.goBack()}>Close</button>
      <ComposedComponent />
    </div>,
    document.getElementById('portal')
  )

const ShowDescription = ({ children }) =>
  <div>
    <h1>ModalWindow</h1>
  </div>

export default withRouter(Modal(ShowDescription))