import PropTypes from "prop-types"
import React, { Fragment } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

import { ModalBox as Modal } from "./ModalBox"

import "./List.scss"

export const List = ({ todos, checkboxHandler, trashHandler }) => {
  const todosCount = todos.length
  const completedCount = todos.filter(({ completed }) => completed).length

  let className =
    "has-background-dark has-text-centered has-text-weight-bold my-4 py-2"
  className +=
    completedCount / todosCount < 0.5
      ? " has-text-warning"
      : " has-text-success"

  return (
    <Fragment>
      <p className={className}>
        {completedCount} / {todosCount}
      </p>

      <ul>
        {todos.map(({ _id: id, completed, text, imgURL, location }) => (
          <li key={id} data-id={id} className={completed ? "completed" : null}>
            <span className="mr-1">{text}</span>&nbsp;
            <input type="checkbox" onClick={checkboxHandler} />
            &nbsp;
            <FontAwesomeIcon
              icon={faTrash}
              className="has-text-danger ml-2"
              onClick={trashHandler}
            />
            {imgURL || location.length ? <Modal image={imgURL} location={location} text={text} /> : null}
          </li>
        ))}
      </ul>
    </Fragment>
  )
}

List.propTypes = {
  checkboxHandler: PropTypes.func,
  todos: PropTypes.array.isRequired,
  trashHandler: PropTypes.func,
}
