import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { modal } from './modal.css'

export default class Modal extends Component {
  componentWillMount() {
    this.root = document.createElement('div')
    document.body.appendChild(this.root)
  }

  componentWillUnmount() {
    document.body.removeChild(this.root)
  }

  render() {
    const { children } = this.props
    return ReactDOM.createPortal(
      <div className={modal}>
        {children}
      </div>,
      this.root
    )
  }
}