const express = require('express')
const router = express.Router()
const controller = require('../controllers/project.controller')
const auth = require('../middleware/auth.middleware')

// PUBLIC
router.get('/', controller.getProjects)

// ADMIN ONLY
router.post('/', auth, controller.createProject)
router.put('/:id', auth, controller.updateProject)
router.delete('/:id', auth, controller.deleteProject)

module.exports = router
