const express = require('express')

const {
    getAllParentTasks,
    getAllChildTasks,
    getSingleTask,
    createTask,
    deleteTask,
    updateTask
} = require('../controllers/taskControllers')

const router = express.Router()


router.get('/:space/', getAllParentTasks)

router.get('/:space/c/:id', getAllChildTasks)

router.get('/:space/:id', getSingleTask)

router.post('/:space/', createTask)

router.delete('/:space/:id', deleteTask)

router.patch('/:space/:id', updateTask)

module.exports = router