import React from 'react'

import Description from '../Description'
import Modal from '../Modal'

import { closeButton } from './modalDescription.css'

const ModalDescription = ({ onClose, ...args }) =>
  <Modal>
    <button className={closeButton} onClick={onClose}>Close</button>
    <Description {...args} />
  </Modal>

export default ModalDescription