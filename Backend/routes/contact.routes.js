const express = require('express')
const router = express.Router()
const controller = require('../controllers/contact.controller')

router.post('/', controller.createContact)
router.get('/', controller.getContacts) // sementara

module.exports = router
