import React from 'react'
import './MessageBox.css'

const MessageBox = ({ message, type, onClose }) => {
  if (!message) return null

  return (
    <div className={`message-banner ${type}`}>
      <span>{message}</span>
      <button className="close-button" onClick={onClose}>×</button>
    </div>
  )
}

export default MessageBox
