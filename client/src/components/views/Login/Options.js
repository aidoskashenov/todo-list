import PropTypes from 'prop-types'
import React from 'react'

export const Options = ({ forgotMode, loginMode, handler }) => (
  <div>
    <button className="button mt-4 ml-2" onClick={handler}>
      {loginMode ? "Create An Account?" : "Already Have An Account?"}
    </button>

    {loginMode && !forgotMode ? (
      <button className="button mt-4 ml-2" onClick={handler}>Forgot Password?</button>
    ) : null}
  </div>
)

Options.propTypes = {
  handler: PropTypes.func,
  forgotMode: PropTypes.bool,
  loginMode: PropTypes.bool
}

Options.defaultProps = { loginMode: false }
