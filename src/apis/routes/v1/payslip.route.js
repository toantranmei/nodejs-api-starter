const express = require('express')

const { payslipController } = require('../../controllers')

const router = express.Router()

router.get('/payslip', payslipController.generatePayslip)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Payslip
 *   description: Generate Payslip for Employee
 */ 

