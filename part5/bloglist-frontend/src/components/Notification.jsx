import React from 'react'
import '../index.css'

const Notification = ({ notification }) => {
  return (
    <div className={notification?.type}>
      <p>{notification?.text}</p>
    </div>
  )
}

export default Notification