const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// GET ALL PROJECTS
exports.getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    })
    res.json(projects)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// CREATE PROJECT
exports.createProject = async (req, res) => {
  try {
    const { title, description, tech, githubUrl, image } = req.body

    const project = await prisma.project.create({
      data: {
        title,
        description,
        tech,
        githubUrl,
        image,
      },
    })

    res.status(201).json(project)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// UPDATE PROJECT
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, tech, githubUrl, image } = req.body

    const project = await prisma.project.update({
      where: { id: Number(id) },
      data: { title, description, tech, githubUrl, image },
    })

    res.json(project)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// DELETE PROJECT
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params

    await prisma.project.delete({
      where: { id: Number(id) },
    })

    res.json({ message: 'Project deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
