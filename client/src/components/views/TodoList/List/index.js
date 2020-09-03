import PropTypes from "prop-types"
import React, { Fragment } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

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
      <p className="has-text-centered">
        {new Date().toLocaleDateString()}&nbsp;
      </p>

      <p className={className}>
        {completedCount} / {todosCount}
      </p>

      <ul>
        {todos.map(({ id, completed, text }) => (
          <li key={id} data-id={id} className={completed ? "completed" : null}>
            <div>
              {text} <input type="checkbox" onClick={checkboxHandler} />
              <FontAwesomeIcon
                icon={faTrash}
                className="has-text-danger ml-2"
                onClick={trashHandler}
              />
            </div>
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
