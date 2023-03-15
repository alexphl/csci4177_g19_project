const express = require('express')

const router = express.Router()

router.post('/login', async (req, res)=>{
    // I should read this: https://blog.logrocket.com/node-js-crypto-module-a-tutorial/

    /** ToDo proper login
     * 1. hash received password
     * 2. compare hashed password to database password
     * 3. send token if correct
     * 4. send failed if not
     */
    res.send({
        token: 'testing123'
    })
})

router.post('/register', async (req, res)=>{
     /**
     * ToDo
     * 1. hash the password
     * 2. add a user with that username and password to database
     * 3. send a welcome email, maybe email verification code 
     * 4. send response saying successful
     */
})

module.exports = router