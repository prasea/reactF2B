import React from 'react'
import PropTypes from 'prop-types'
function Button({children, type, version, isDisabled}) {
  return (
    <button type={type} disabled={isDisabled} className={`btn btn-${version}`}>{children}</button>
  )
}
Button.defaultProps = {
  type : "submit", 
  isDisabled : "false", 
  version : "primary"
}
export default Button