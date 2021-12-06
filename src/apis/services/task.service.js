const { Task } = require('../models')

/**
 * Create a task
 * @param {Object} taskBody
 * @returns {Promise<Task>}
 */
const createTask = async (taskBody) => {
    return Task.create(taskBody)
}

const deleteTask = async (taskId) => {
    return Task.deleteOne({ _id: taskId })
}

/**
 * Get a task
 * @param {Object} taskBody
 * @returns {Promise<Task>}
 */
const getTasks = async () => {
    return Task.find({}).sort({ dueDate: -1 }).lean()
}

const updateTask = async (id, taskBody) => {
    const task = await Task.findOne({ _id: id })

    Object.keys(taskBody).forEach((key) => {
        task[key] = taskBody[key]
    })

    console.log('taskkkk: ', task)

    await task.save()

    return task
}

module.exports = {
    createTask,
    deleteTask,
    getTasks,
    updateTask,
}
