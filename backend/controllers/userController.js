// get the model
const User = require('../models/userModel')
const mongoose = require('mongoose')

// create new user
const createUser = async (req, res) => {
    const {name, password, email} = req.body

    // ToDo Hash password before storing in database -> done in auth and called by auth.
    // maybe some control that it can only be called by auth? not sure how to do that.

    // add to database - mongo makes an _id
    // ToDo - no duplicate emails
    try{
        const user = await User.create({name, password, email})
        res.status(200).json(user) // return the object
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

// get all users
const getUsers = async (req, res) => {
    const users = await User.find({}).sort({createdAt:-1})
    res.status(200).json(users)
}

// get a single user by id
const getUser = async (req, res) =>{
    const {id} = req.params
    
    // if id is wrong type
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such user'})
    }

    // get id from database
    const user = await User.findById(id)

    // if user not found
    if(!user){
        return res.status(404).json({error: 'No such user'})
    }

    // user found
    res.status(200).json(user)
}

// findUser - find a user by email
const findUser = async (req, res)=>{
    const {email} = req.body
    
    // toDo sanitize - check if it's an email

    const user = await User.find({email: email})
    // if user not found
    if(!user){
        return res.status(404).json({error: 'No such user'})
    } 

    // user found
    res.status(200).json(user)
}

// delete a user
const deleteUser = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such user'})
    }

    const user = await User.findOneAndDelete({_id: id})

    if(!user){
        return res.status(400).json({error: 'No such user'})
    }

    res.status(200).json(user)
}

// update a user
const updateUser = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such user'})
    }

    const user = await User.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if(!user){
        return res.status(400).json({error: 'No such user'})
    }

    res.status(200).json(user)
}

module.exports = {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    findUser
}