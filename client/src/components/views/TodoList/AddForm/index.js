import PropTypes from "prop-types"
import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCamera } from "@fortawesome/free-solid-svg-icons"

export const AddForm = ({ addHandler, widgetHandler, signOutHandler }) => {
  return (
    <form className="mt-4" onSubmit={addHandler}>
      <div className="field">
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Enter a new Todo Item"
          />
        </div>
      </div>

      <div className="control">
        <button className="button is-primary" onClick={widgetHandler} type="button">
          <FontAwesomeIcon icon={faCamera} />&nbsp;
          Add Photo/Doc
        </button>
      </div>

      <div className="field is-grouped mt-3 flex--align-center">
        <div className="control">
          <button className="button is-success" type="submit">
            Add Todo!
          </button>
        </div>

        <div className="control">
          <button
            className="button is-small is-danger ml-2"
            type="button"
            onClick={signOutHandler}
          >
            Sign Out
          </button>
        </div>
      </div>
    </form>
  )
}

AddForm.propTypes = {
  addHandler: PropTypes.func,
  signOutHandler: PropTypes.func,
  widgetHandler: PropTypes.func
}
