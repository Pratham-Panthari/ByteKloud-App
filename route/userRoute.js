const express = require('express')
const {createUser, login, updateUser, getUser} = require('../controller/userController')
const router = express.Router()

router.post('/register', createUser)
router.post('/login', login)
router.put('/update-user/:id', updateUser)
router.get('/getuser/:id', getUser)

module.exports = router