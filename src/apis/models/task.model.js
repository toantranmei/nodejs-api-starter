const mongoose = require('mongoose')

const { toJSON } = require('./plugins')

const taskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        dueDate: {
            type: Number,
            required: false,
        },
        priority: {
            type: String,
            required: false,
        },
        completed: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

taskSchema.plugin(toJSON)

/**
 * @typedef Token
 */
const Task = mongoose.model('Task', taskSchema)

module.exports = Task
