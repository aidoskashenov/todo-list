import PropTypes from "prop-types"
import React from "react"

export const AddForm = ({ addHandler, signOutHandler }) => {
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

      <div className="flex flex--align-center">
        <button className="button is-success level-item">Add It!</button>
        <button
          className="button is-small is-warning level-item ml-2"
          type="button"
          onClick={signOutHandler}
        >
          Sign Out
        </button>
      </div>
    </form>
  )
}

AddForm.propTypes = { addHandler: PropTypes.func, signOutHandler: PropTypes.func }
