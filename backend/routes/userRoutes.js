const express = require('express')
const {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    findUser
} = require('../controllers/userController')

const router = express.Router()

// get all users
router.get('/', getUsers)

// get single user by id 
//  ** Important ** keep this one before the other get or else it will be overwritten
router.get('/find/', findUser)

// get single user by id
router.get('/:id', getUser)

// create a user
router.post('/', createUser)

// delete a user by id
router.delete('/:id',deleteUser)

// update a user by id
router.patch('/:id', updateUser)

module.exports = router