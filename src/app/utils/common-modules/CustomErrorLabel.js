import React from 'react'

function CustomErrorLabel({ touched, error, color }) {
  if (touched && error) {
    const style = color ? { color: color } : { color: '#ff0000' }
    return (
      <div className="invalid-feedback" >{error}</div>
    )
  }
}

export default CustomErrorLabel

