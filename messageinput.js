import React, { useState, useRef } from 'react';

function MessageInput({ onSendMessage, socket }) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  const handleTyping = (value) => {
    setMessage(value);
    
    if (socket) {
      if (!isTyping) {
        setIsTyping(true);
        socket.emit('typing_start');
      }
      
      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      // Set new timeout
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        socket.emit('typing_stop');
      }, 1000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      
      // Stop typing indicator
      if (isTyping && socket) {
        setIsTyping(false);
        socket.emit('typing_stop');
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const addEmoji = (emoji) => {
    setMessage(prev => prev + emoji);
  };

  const quickEmojis = ['😊', '😂', '❤️', '👍', '😢', '😮', '😡', '🎉'];

  return (
    <div className="message-input-container">
      <div className="emoji-bar">
        {quickEmojis.map((emoji, index) => (
          <button 
            key={index}
            type="button"
            className="emoji-btn"
            onClick={() => addEmoji(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="message-form">
        <div className="input-wrapper">
          <textarea
            value={message}
            onChange={(e) => handleTyping(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message... (Press Enter to send)"
            className="message-input"
            rows="1"
            maxLength={500}
          />
          <button 
            type="submit" 
            className="send-btn"
            disabled={!message.trim()}
          >
            <span>Send</span>
            <span className="send-icon">📤</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default MessageInput;
