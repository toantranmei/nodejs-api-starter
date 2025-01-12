const express = require('express')

const authRoute = require('./v1/auth.route')
const taskRoute = require('./v1/task.route')
const userRoute = require('./v1/user.route')
const statusRoute = require('./v1/status.route')
const payslipRoute = require('./v1/payslip.route')
const leaveRoute = require('./v1/leave.route')

const router = express.Router()

const defaultRoutes = [
    {
        path: '/v1/auth',
        route: authRoute,
    },
    {
        path: '/v1/tasks',
        route: taskRoute,
    },
    {
        path: '/v1/users',
        route: userRoute,
    },
    {
        path: '/v1/status',
        route: statusRoute,
    },
    {
        path: '/v1/payslip',
        route: payslipRoute,
    },
    {
        path: '/v1/leave',
        route: leaveRoute,
    },
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router
