const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Middleware auth (reuse dari auth yang sudah ada)
const verifyToken = require('../middleware/auth.middleware')

// GET all messages
router.get('/', async (req, res) => {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'asc' },
    })
    res.json(messages)
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil pesan' })
  }
})

// DELETE all messages (admin only)
router.delete('/all', verifyToken, async (req, res) => {
  try {
    await prisma.message.deleteMany()
    res.json({ message: 'Semua pesan berhasil dihapus' })
  } catch (err) {
    res.status(500).json({ error: 'Gagal menghapus semua pesan' })
  }
})

// DELETE message by id (admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    await prisma.message.delete({ where: { id } })
    res.json({ message: 'Pesan berhasil dihapus' })
  } catch (err) {
    res.status(500).json({ error: 'Gagal menghapus pesan' })
  }
})

module.exports = router