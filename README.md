# ChatWave 🌊💬

A modern, real-time chat application built with React and Socket.IO featuring instant messaging, group chats, typing indicators, and a sleek user interface.

![ChatWave Demo](https://img.shields.io/badge/Status-Live-brightgreen) ![React](https://img.shields.io/badge/React-18.2.0-blue) ![Socket.IO](https://img.shields.io/badge/Socket.IO-4.7.2-black) ![Node.js](https://img.shields.io/badge/Node.js-Express-green)

## ✨ Features

- **Real-time Messaging** - Instant message delivery using WebSocket connections
- **Group Chat Rooms** - Multiple themed chat rooms (General, Tech, Music, Gaming, Random)
- **Typing Indicators** - See when other users are typing
- **User Presence** - Real-time online user list with avatars
- **Emoji Support** - Quick emoji picker for expressive messaging
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Modern UI** - Clean, gradient-based design with smooth animations

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/chatwwave.git
cd chatwwave
```

2. **Install server dependencies**
```bash
cd server
npm install
```

3. **Install client dependencies**
```bash
cd ../client
npm install
```

4. **Start the server**
```bash
cd ../server
npm run dev
```

5. **Start the client** (in a new terminal)
```bash
cd client
npm start
```

6. **Open your browser**
Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
chatwwave/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.js         # Main app component
│   │   ├── App.css        # Styles
│   │   └── index.js       # Entry point
│   └── package.json
├── server/                 # Node.js backend
│   ├── index.js           # Server entry point
│   └── package.json
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Socket.IO Client** - Real-time communication
- **CSS3** - Modern styling with gradients and animations

### Backend
- **Node.js** - Server runtime
- **Express** - Web framework
- **Socket.IO** - WebSocket implementation
- **CORS** - Cross-origin resource sharing

## 🎮 Usage

1. **Join a Chat Room**
   - Enter your username
   - Select a chat room
   - Click "Join Chat"

2. **Send Messages**
   - Type in the message input
   - Use emoji buttons for quick reactions
   - Press Enter to send

3. **Switch Rooms**
   - Leave current chat
   - Select a different room
   - Join the new room

## 🔧 Configuration

### Server Configuration
The server runs on port 5000 by default. You can change this in `server/index.js`:

```javascript
const PORT = process.env.PORT || 5000;
```

### Client Configuration
Update the server URL in `client/src/App.js`:

```javascript
const newSocket = io('http://localhost:5000');
```

## 📱 Features in Detail

### Real-time Messaging
- Instant message delivery using WebSocket connections
- Message history preserved during session
- System notifications for user join/leave events

### Typing Indicators
- Real-time typing status updates
- Multiple user typing support
- Automatic timeout after 1 second of inactivity

### User Management
- Unique user identification
- Online user list with avatars
- Color-coded user avatars based on username

### Room Management
- Multiple predefined chat rooms
- Room switching capability
- User count per room

## 🎨 Customization

### Adding New Chat Rooms
Edit the room options in `client/src/App.js`:

```javascript
<select value={room} onChange={(e) => setRoom(e.target.value)}>
  <option value="general">🌍 General</option>
  <option value="your-room">🆕 Your Room</option>
</select>
```

### Styling
Customize the appearance by modifying `client/src/App.css`. The design uses CSS custom properties for easy theming.

## 🚀 Deployment

### Deploy to Heroku

1. **Server Deployment**
```bash
cd server
heroku create your-app-name-server
git add .
git commit -m "Deploy server"
git push heroku main
```

2. **Client Deployment**
```bash
cd client
# Update server URL in App.js to your Heroku server URL
npm run build
# Deploy to Netlify, Vercel, or your preferred platform
```

### Deploy to Vercel/Netlify

1. Build the client:
```bash
cd client
npm run build
```

2. Deploy the `build` folder to your platform of choice

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- Socket.IO team for the excellent real-time communication library
- React team for the amazing frontend framework
- All contributors who help improve this project

## 📧 Contact

Sanjana C K - 23202041@rmd.ac.in

Project Link: https://github.com/sanjanachandrann/ChatWave---Real-Time-Chat-Application

---

**Made with ❤️ for the open source community**
