const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// GET ALL ACHIEVEMENTS
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

// CREATE ACHIEVEMENT
exports.createAchievement = async (req, res) => {
  try {
    const { title, description, year } = req.body

    const image = req.file ? `/uploads/${req.file.filename}` : null

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

// UPDATE ACHIEVEMENT
exports.updateAchievement = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, year } = req.body

    // ✅ Kalau ada file baru → pakai file baru, kalau tidak → pakai gambar lama
    const existingAchievement = await prisma.achievement.findUnique({
      where: { id: Number(id) }
    })

    const image = req.file
      ? `/uploads/${req.file.filename}`
      : existingAchievement.image  // ✅ pertahankan gambar lama

    const achievement = await prisma.achievement.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        year: Number(year),
        image,
      },
    })

    res.json(achievement)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// DELETE ACHIEVEMENT
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
