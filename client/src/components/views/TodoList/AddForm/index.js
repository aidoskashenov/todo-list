import PropTypes from "prop-types"
import React from "react"

export const AddForm = ({ handler }) => {
  return (
    <form className="mt-4" onSubmit={handler}>
      <div className="field">
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Enter a new Todo Item"
          />
        </div>
      </div>

      <button className="button is-success">Add It!</button>
    </form>
  )
}

AddForm.propTypes = { handler: PropTypes.func }
