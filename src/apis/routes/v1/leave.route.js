const express = require('express')
const { leaveController } = require('../../controllers')

const router = express.Router()

router.get('/getEmployeeLeaveBalanceByEmployeeId', leaveController.getEmployeeLeaveBalanceByEmployeeId)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: getEmployeeLeaveBalanceByEmployeeId
 *   description: Get Employee Leave Balance for current year
 */
