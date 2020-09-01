import PropTypes from 'prop-types'
import React from 'react'

export const Options = ({ loginMode }) => (
  <button className="button mt-4 ml-2">
    {loginMode ? "Create An Account?" : "Already Have An Account?"}
  </button>
)

Options.propTypes = {
  loginMode: PropTypes.bool
}

Options.defaultProps = { loginMode: false }
