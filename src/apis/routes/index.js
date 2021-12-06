const express = require('express')

const authRoute = require('./v1/auth.route')
const taskRoute = require('./v1/task.route')
const userRoute = require('./v1/user.route')

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
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router
