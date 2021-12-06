const express = require('express')

const { taskController } = require('../../controllers')

const router = express.Router()

router.delete('/:id', taskController.DeleteTask)
router.patch('/:id', taskController.UpdateTask)
router.get('/list', taskController.GetTasks)
router.post('/new', taskController.CreateTask)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management and retrieval
 */
