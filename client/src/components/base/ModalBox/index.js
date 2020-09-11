import React, { useState } from "react"
import Modal from "react-modal"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWindowClose } from "@fortawesome/free-solid-svg-icons"

import "./ModalBox.scss"

Modal.setAppElement(document.getElementById("root"))

export const ModalBox = () => {
  const [modalActive, setModalActive] = useState(false)

  const toggleModal = () => {
    setModalActive((prevModalActive) => !prevModalActive)
  }

  return (
    <div>
      <button className="button is-info is-small" onClick={toggleModal}>
        Addl Info
      </button>
      <Modal isOpen={modalActive} contentLabel="Map and/or Photo">
        <div className="close">
          <FontAwesomeIcon
            icon={faWindowClose}
            className="has-text-warning-dark"
            onClick={toggleModal}
            size="2x"
          />
        </div>
        <div className="tabs">
          <ul>
            <li className="is-active">
              <button className="button is-active is-info is-text">Map</button>
            </li>
            <li>
              <button className="button is-text">Photos</button>
            </li>
          </ul>
        </div>
      </Modal>
    </div>
  )
}
