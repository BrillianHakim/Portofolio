const express = require('express')
const router = express.Router()
const controller = require('../controllers/auth.controller')
const authMiddleware = require('../middleware/auth.middleware') // ✅ tambah ini

router.post('/login', controller.login)
router.get('/verify', authMiddleware, (req, res) => {  // ✅ tambah ini
  res.json({ valid: true, user: req.user })
})

module.exports = router