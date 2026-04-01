const express = require('express')
const router = express.Router()
const controller = require('../controllers/achievement.controller')
const upload = require('../middleware/upload')

router.get('/', controller.getAchievements)
router.post('/', upload.single('image'), controller.createAchievement)
router.put('/:id', upload.single('image'), controller.updateAchievement)
router.delete('/:id', controller.deleteAchievement)
module.exports = router