import PropTypes from "prop-types"
import React, { useState } from "react"

import Modal from "react-modal"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWindowClose } from "@fortawesome/free-solid-svg-icons"

import { MapViewer as Map } from "./MapViewer"

import "./ModalBox.scss"

Modal.setAppElement(document.getElementById("root"))

export const ModalBox = ({ image, location, text }) => {
  const [modalActive, setModalActive] = useState(false)

  const toggleModal = () => {
    setModalActive((prevModalActive) => !prevModalActive)
  }

  return (
    <div>
      <button className="button is-info is-small" onClick={toggleModal}>
        Addl. Info
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
        <div className="columns mt-2">
          {image ? (
            <div className="column">
              <figure className="image is-128x128">
                <img src={image} alt={text} />
              </figure>
            </div>
          ) : null}

            <div className="column">
              <Map location={location} text={text} />
            </div>
        </div>
      </Modal>
    </div>
  )
}

ModalBox.propTypes = {
  image: PropTypes.string,
  location: PropTypes.array,
  text: PropTypes.string,
}
