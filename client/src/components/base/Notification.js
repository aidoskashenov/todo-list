import PropTypes from "prop-types"
import React from "react"

export const Notification = ({ notification: { className, text } }) => (
  <p className={`notification my-3 ${className}`}>
    <button className="delete" />
    {text || "Some other error!"}
  </p>
)

Notification.propTypes = {
  notification: PropTypes.shape({
    className: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
}
