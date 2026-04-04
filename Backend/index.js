const express = require('express')
const cors = require('cors')
require('dotenv').config()
const http = require('http')
const { Server } = require('socket.io')
const app = express()
const server = http.createServer(app)

// Ganti bagian inisialisasi Server io dengan ini:
const io = new Server(server, {
  cors: {
    // Gunakan fungsi untuk memastikan origin dicek dengan benar
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:5173',
        'https://brillianhakim.vercel.app',
        'https://portofolio-theta-eosin.vercel.app'
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST'],
    credentials: true
  },
  // Tambahkan ini untuk stabilitas di environment server seperti Railway
  allowEIO3: true,
  transports: ['websocket', 'polling'] 
});

app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    'http://localhost:5173',
    'https://brillianhakim.vercel.app',
    'https://portofolio-theta-eosin.vercel.app'
  ];
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.json())

const projectRoutes = require('./routes/project.routes')
const achievementRoutes = require('./routes/achievement.routes')
const contactRoutes = require('./routes/contact.routes')
const authRoutes = require('./routes/auth.routes')
const chatRoutes = require('./routes/chat.routes')

app.use('/api/projects', projectRoutes)
app.use('/api/achievements', achievementRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/auth', authRoutes)        
app.use('/api/chat', chatRoutes)        
app.use('/uploads', express.static('uploads'))

// SOCKET.IO
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

io.on('connection', async (socket) => {
  console.log('🟢 User connected:', socket.id)
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'asc' },
  })
  socket.emit('chat-history', messages)
  socket.on('send-message', async (data) => {
    const message = await prisma.message.create({
      data: {
        user: data.user,
        text: data.text,
      },
    })
    io.emit('receive-message', message)
  })
  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id)
  })
})

app.get('/', (req, res) => {
  res.json({ message: 'Backend API is running 🚀' })
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`Backend + Socket.IO running on http://localhost:${PORT}`)
})