const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Store active users and typing status
const activeUsers = new Map();
const typingUsers = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user joining
  socket.on('join', (userData) => {
    activeUsers.set(socket.id, {
      id: socket.id,
      username: userData.username,
      room: userData.room || 'general'
    });
    
    socket.join(userData.room || 'general');
    
    // Broadcast user list update
    io.to(userData.room || 'general').emit('users_update', 
      Array.from(activeUsers.values()).filter(user => user.room === (userData.room || 'general'))
    );
    
    // Welcome message
    socket.emit('message', {
      id: Date.now(),
      text: `Welcome to ChatWave! 🌊`,
      username: 'System',
      timestamp: new Date().toISOString(),
      type: 'system'
    });
    
    // Notify others
    socket.to(userData.room || 'general').emit('message', {
      id: Date.now(),
      text: `${userData.username} joined the chat`,
      username: 'System',
      timestamp: new Date().toISOString(),
      type: 'system'
    });
  });

  // Handle messages
  socket.on('message', (messageData) => {
    const user = activeUsers.get(socket.id);
    if (user) {
      const message = {
        id: Date.now(),
        text: messageData.text,
        username: user.username,
        timestamp: new Date().toISOString(),
        type: 'user'
      };
      
      io.to(user.room).emit('message', message);
    }
  });

  // Handle typing indicators
  socket.on('typing_start', () => {
    const user = activeUsers.get(socket.id);
    if (user) {
      typingUsers.set(socket.id, user.username);
      socket.to(user.room).emit('user_typing', {
        username: user.username,
        isTyping: true
      });
    }
  });

  socket.on('typing_stop', () => {
    const user = activeUsers.get(socket.id);
    if (user) {
      typingUsers.delete(socket.id);
      socket.to(user.room).emit('user_typing', {
        username: user.username,
        isTyping: false
      });
    }
  });

  // Handle room switching
  socket.on('join_room', (roomName) => {
    const user = activeUsers.get(socket.id);
    if (user) {
      // Leave current room
      socket.leave(user.room);
      socket.to(user.room).emit('message', {
        id: Date.now(),
        text: `${user.username} left the room`,
        username: 'System',
        timestamp: new Date().toISOString(),
        type: 'system'
      });

      // Update user's room
      user.room = roomName;
      socket.join(roomName);

      // Update user lists for both rooms
      io.to(user.room).emit('users_update', 
        Array.from(activeUsers.values()).filter(u => u.room === user.room)
      );

      // Welcome to new room
      socket.to(roomName).emit('message', {
        id: Date.now(),
        text: `${user.username} joined the room`,
        username: 'System',
        timestamp: new Date().toISOString(),
        type: 'system'
      });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const user = activeUsers.get(socket.id);
    if (user) {
      // Remove from typing users
      typingUsers.delete(socket.id);
      
      // Notify others
      socket.to(user.room).emit('message', {
        id: Date.now(),
        text: `${user.username} left the chat`,
        username: 'System',
        timestamp: new Date().toISOString(),
        type: 'system'
      });
      
      // Remove user and update user list
      activeUsers.delete(socket.id);
      io.to(user.room).emit('users_update', 
        Array.from(activeUsers.values()).filter(u => u.room === user.room)
      );
    }
    
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🌊 ChatWave server running on port ${PORT}`);
});
