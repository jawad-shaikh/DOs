const express = require('express')

const {
    getAllSpaces,
    getSingleSpace,
    createSpace,
    deleteSpace,
    updateSpace
} = require('../controllers/spaceControllers')

const router = express.Router()


router.get('/', getAllSpaces)

router.get('/:id', getSingleSpace)

router.post('/', createSpace)

router.delete('/:id', deleteSpace)

router.patch('/:id', updateSpace)

module.exports = router