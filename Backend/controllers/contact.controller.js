const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// CREATE CONTACT MESSAGE
exports.createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    const contact = await prisma.contact.create({
      data: { name, email, message },
    })

    res.status(201).json({ message: 'Message sent', contact })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// GET ALL CONTACTS (sementara untuk cek)
exports.getContacts = async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    })
    res.json(contacts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
