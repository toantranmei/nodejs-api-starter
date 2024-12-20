const express = require('express')

const { statusController } = require('../../controllers')

const router = express.Router()

router.get('/status', statusController.status)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Status
 *   description: API Status
 */ 
