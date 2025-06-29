import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Chat from './components/Chat';
import './App.css';

function App() {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('general');
  const [isConnected, setIsConnected] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(true);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  const joinChat = (e) => {
    e.preventDefault();
    if (username.trim()) {
      const newSocket = io('http://localhost:5000');
      setSocket(newSocket);
      
      newSocket.emit('join', { username: username.trim(), room });
      setIsConnected(true);
      setShowJoinForm(false);
    }
  };

  const leaveChat = () => {
    if (socket) {
      socket.disconnect();
    }
    setSocket(null);
    setIsConnected(false);
    setShowJoinForm(true);
    setUsername('');
  };

  if (showJoinForm) {
    return (
      <div className="app">
        <div className="join-container">
          <div className="join-form">
            <div className="logo">
              <h1>🌊 ChatWave</h1>
              <p>Connect instantly, chat seamlessly</p>
            </div>
            
            <form onSubmit={joinChat}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  maxLength={20}
                  required
                />
              </div>
              
              <div className="input-group">
                <select 
                  value={room} 
                  onChange={(e) => setRoom(e.target.value)}
                >
                  <option value="general">🌍 General</option>
                  <option value="tech">💻 Tech Talk</option>
                  <option value="music">🎵 Music</option>
                  <option value="gaming">🎮 Gaming</option>
                  <option value="random">🎲 Random</option>
                </select>
              </div>
              
              <button type="submit" className="join-btn">
                Join Chat 🚀
              </button>
            </form>
            
            <div className="features">
              <div className="feature">
                <span>⚡</span>
                <span>Real-time messaging</span>
              </div>
              <div className="feature">
                <span>👥</span>
                <span>Group conversations</span>
              </div>
              <div className="feature">
                <span>💬</span>
                <span>Typing indicators</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {isConnected && socket && (
        <Chat 
          socket={socket} 
          username={username} 
          room={room}
          onLeave={leaveChat}
        />
      )}
    </div>
  );
}

export default App;
