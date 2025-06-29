import React, { useState, useEffect, useRef } from 'react';
import MessageInput from './MessageInput';
import UserList from './UserList';
import TypingIndicator from './TypingIndicator';

function Chat({ socket, username, room, onLeave }) {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.on('message', (message) => {
        setMessages(prev => [...prev, message]);
      });

      socket.on('users_update', (userList) => {
        setUsers(userList);
      });

      socket.on('user_typing', ({ username: typingUsername, isTyping }) => {
        setTypingUsers(prev => {
          if (isTyping) {
            return prev.includes(typingUsername) ? prev : [...prev, typingUsername];
          } else {
            return prev.filter(user => user !== typingUsername);
          }
        });
      });

      return () => {
        socket.off('message');
        socket.off('users_update');
        socket.off('user_typing');
      };
    }
  }, [socket]);

  const sendMessage = (messageText) => {
    if (messageText.trim() && socket) {
      socket.emit('message', { text: messageText });
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRoomIcon = (roomName) => {
    const icons = {
      general: '🌍',
      tech: '💻',
      music: '🎵',
      gaming: '🎮',
      random: '🎲'
    };
    return icons[roomName] || '💬';
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="room-info">
          <h2>{getRoomIcon(room)} {room.charAt(0).toUpperCase() + room.slice(1)}</h2>
          <span className="user-count">{users.length} online</span>
        </div>
        <div className="header-actions">
          <span className="current-user">👋 {username}</span>
          <button onClick={onLeave} className="leave-btn">
            Leave Chat
          </button>
        </div>
      </div>

      <div className="chat-body">
        <div className="messages-section">
          <div className="messages-container">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`message ${message.type} ${message.username === username ? 'own' : ''}`}
              >
                {message.type === 'system' ? (
                  <div className="system-message">
                    <span className="system-text">{message.text}</span>
                    <span className="timestamp">{formatTime(message.timestamp)}</span>
                  </div>
                ) : (
                  <div className="user-message">
                    <div className="message-header">
                      <span className="username">{message.username}</span>
                      <span className="timestamp">{formatTime(message.timestamp)}</span>
                    </div>
                    <div className="message-text">{message.text}</div>
                  </div>
                )}
              </div>
            ))}
            
            <TypingIndicator typingUsers={typingUsers} />
            <div ref={messagesEndRef} />
          </div>
          
          <MessageInput onSendMessage={sendMessage} socket={socket} />
        </div>

        <UserList users={users} currentUser={username} />
      </div>
    </div>
  );
}

export default Chat;
