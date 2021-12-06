const httpStatus = require('http-status')

const catchAsync = require('../../utils/catch-async')
const { taskService } = require('../services')

const CreateTask = catchAsync(async (req, res) => {
    const task = await taskService.createTask(req.body)
    res.status(httpStatus.CREATED).send({ task })
})

const DeleteTask = catchAsync(async (req, res) => {
    await taskService.deleteTask(req.params.id)
    res.status(httpStatus.NO_CONTENT).send()
})

const GetTasks = catchAsync(async (req, res) => {
    const tasks = await taskService.getTasks()
    res.status(httpStatus.OK).send({ tasks })
})

const UpdateTask = catchAsync(async (req, res) => {
    const task = await taskService.updateTask(req.params.id, req.body)
    res.status(httpStatus.OK).send({ task })
})

module.exports = {
    CreateTask,
    DeleteTask,
    GetTasks,
    UpdateTask,
}
