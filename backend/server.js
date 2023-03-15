const express = require('express')
const mongoose = require('mongoose')

// this allows you to access process.env to get credentials from .env file
require('dotenv').config()

// routes imports
const userRoutes = require('./routes/userRoutes')
// const authRoutes = require('./routes/authRoutes')

const app = express()

const port = process.env.PORT || 3000

// middleware
app.use(express.json())
app.use((req, res, next)=>{
    console.log(req.path, req.method)
    console.log(req.body)
    next()
})

// routes
app.use('/api/users', userRoutes)
// app.use('/api/auth', authRoutes)

// connect to db, then listen on port ?
mongoose.connect(process.env.MONGO_URI).then(()=>{
    // listen for requests
    app.listen(port, ()=>{
        console.log('Connected to db and listening on port', port)
    })

}).catch((error)=>{
    console.log(error)
})