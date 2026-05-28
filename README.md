# Call4me

> 🔥 Modern realtime video call app built with Socket.IO + WebRTC

---

# ✨ Features

✅ Realtime video calling  
✅ Multi-user rooms  
✅ WebRTC peer-to-peer connection  
✅ Socket.IO signaling  
✅ Live chat 💬  
✅ Typing indicator ⌨️  
✅ Emoji reactions 😂🔥❤️  
✅ Screen sharing 🖥️  
✅ Responsive UI 📱  
✅ Dynamic video grid 🎥  
✅ Join/leave sounds 🔊  
✅ Online participants counter 👥

---

# 🖼️ Preview

## 💻 Desktop

- Glassmorphism UI
- Auto video layout
- Floating controls
- Chat sidebar

## 📱 Mobile

- Responsive layout
- Optimized controls
- Fullscreen videos

---

# ⚙️ Tech Stack

## Frontend

- HTML5
- CSS3
- Vanilla JavaScript

## Backend

- Node.js
- Express
- Socket.IO

## Realtime Media

- WebRTC
- STUN/TURN servers

---

# 📁 Project Structure

```txt
Call4me/
│
├── index.html
├── style.css
│
├── app.js
├── socket.js
├── webrtc.js
├── ui.js
│
├── server.js
│
├── package.json
├── .gitignore
│
├── sounds/
│   ├── join.mp3
│   ├── leave.mp3
│   └── ring.mp3
│
└── assets/
```

---

# 🚀 Installation

## 1️⃣ Clone repository

```bash
git clone https://github.com/YOUR_USERNAME/call4me.git
```

---

## 2️⃣ Open project

```bash
cd call4me
```

---

## 3️⃣ Install dependencies

```bash
npm install
```

---

## 4️⃣ Start server

```bash
node server.js
```

---

# 🌍 Open App

```txt
http://localhost:3001
```

---

# ☁️ Deploy

## 🚀 Render

1. Push to GitHub
2. Create Web Service
3. Build command:

```bash
npm install
```

4. Start command:

```bash
node server.js
```

🔥 Done.

---

# 🔥 How It Works

## Socket.IO

Used for:
- signaling
- chat
- reactions
- typing events
- room management

---

## WebRTC

Used for:
- audio/video streams
- peer-to-peer connection
- screen sharing

---

# 🧠 Architecture

```txt
Frontend
   ↓
Socket.IO signaling
   ↓
WebRTC peers
```

---

# 🎥 Multi-user System

Each user creates:
```txt
1 RTCPeerConnection / participant
```

Example:

```txt
A ↔ B
A ↔ C
A ↔ D
```

---

# ⚠️ Current Limitations

❌ Mesh architecture can lag with many users  
❌ No authentication yet  
❌ No database yet  
❌ No recording yet

---

# 🚀 Future Plans

- 🔐 Authentication
- 🧠 AI noise suppression
- 📹 Recording
- 📌 Pinned videos
- 👑 Host controls
- 💾 Database
- 🔔 Notifications
- ☁️ SFU architecture
- 🎨 Themes
- 🌙 Dark/Light mode

---

# 💀 Ultimate Goal

Become:
- Discord clone
- Google Meet clone
- Zoom clone

🔥🔥🔥

---

# ❤️ Credits

Built with:
- ☕ Coffee
- 😭 Pain
- 🔥 WebRTC
- 💀 Debugging

---

# ⭐ Support

If you like this project:

⭐ Star the repository  
🍴 Fork the project  
🚀 Share with friends

---

# 🛸 Call4me

> “Why text when you can scream in realtime?” 🔥