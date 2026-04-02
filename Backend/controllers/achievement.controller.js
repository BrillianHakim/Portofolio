const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// GET ALL
exports.getAchievements = async (req, res) => {
  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: { createdAt: 'desc' },
    })
    res.json(achievements)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// CREATE
exports.createAchievement = async (req, res) => {
  try {
    const { title, description, year } = req.body

    // ✅ Cloudinary return req.file.path bukan req.file.filename
    const image = req.file ? req.file.path : null

    const achievement = await prisma.achievement.create({
      data: {
        title,
        description,
        year: Number(year),
        image
      }
    })

    res.status(201).json(achievement)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// UPDATE
exports.updateAchievement = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, year } = req.body

    const existingAchievement = await prisma.achievement.findUnique({
      where: { id: Number(id) }
    })

    // ✅ Cloudinary return req.file.path
    const image = req.file
      ? req.file.path
      : existingAchievement.image

    const achievement = await prisma.achievement.update({
      where: { id: Number(id) },
      data: { title, description, year: Number(year), image },
    })

    res.json(achievement)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// DELETE
exports.deleteAchievement = async (req, res) => {
  try {
    const { id } = req.params

    await prisma.achievement.delete({
      where: { id: Number(id) },
    })

    res.json({ message: 'Achievement deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}