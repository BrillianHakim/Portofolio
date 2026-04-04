const express = require('express');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const { PrismaClient } = require('@prisma/client');

const app = express();
const server = http.createServer(app);
const prisma = new PrismaClient();

// 1. KONFIGURASI SOCKET.IO (Update-mu sudah masuk sini)
const io = new Server(server, {
  path: '/socket.io/', // Tambahkan path eksplisit
  cors: {
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
  allowEIO3: true,
  transports: ['websocket', 'polling'] 
});

// 2. MIDDLEWARE EXPRESS
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://brillianhakim.vercel.app',        
    'https://portofolio-theta-eosin.vercel.app' 
  ],
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// 3. ROUTES
const projectRoutes = require('./routes/project.routes');
const achievementRoutes = require('./routes/achievement.routes');
const contactRoutes = require('./routes/contact.routes');
const authRoutes = require('./routes/auth.routes');
const chatRoutes = require('./routes/chat.routes');

app.use('/api/projects', projectRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);        
app.use('/api/chat', chatRoutes);        

app.get('/', (req, res) => {
  res.json({ message: 'Backend API is running 🚀' });
});

// 4. LOGIK SOCKET.IO
io.on('connection', async (socket) => {
  console.log('🟢 User connected:', socket.id);

  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'asc' },
    });
    socket.emit('chat-history', messages);
  } catch (error) {
    console.error('Error fetching history:', error);
  }

  socket.on('send-message', async (data) => {
    try {
      const message = await prisma.message.create({
        data: {
          user: data.user,
          text: data.text,
        },
      });
      io.emit('receive-message', message);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });
});

// 5. LISTEN (Gunakan server, bukan app)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Backend + Socket.IO running on port ${PORT}`);
});