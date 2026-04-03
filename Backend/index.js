const express = require('express')
const cors = require('cors')
require('dotenv').config()
const http = require('http')
const { Server } = require('socket.io')
const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:5173',
      'https://brillianhakim.vercel.app',
      'https://portofolio-theta-eosin.vercel.app'
    ],
    methods: ['GET', 'POST'],
    credentials: true
  },
  transports: ['polling', 'websocket'],
  allowEIO3: true
})

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://brillianhakim.vercel.app',        
    'https://portofolio-theta-eosin.vercel.app' 
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

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