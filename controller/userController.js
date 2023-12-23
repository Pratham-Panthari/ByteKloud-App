const User = require('../model/User')
const {hashpassword, comparePassword} = require('../helpers/authHelper')
const JWT = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const createUser = async(req, res) => {
    try {
        const { name, email, password, age, profession, gender } = req.body

        if(!name){
           return res.status(400).send( { message: 'Please enter name' } )
        }
        if(!email){
            return res.status(400).send( { message: 'Please enter email' } )
        }
        if(!email.includes('@') || !email.includes('.')){
            return res.status(500).send({status: 'failed', message: 'Email invalid'})
        } 
         if(!password){
            return res.status(400).send( { message: 'Please enter password' } )
        }
        if(password.length <5 || password.length >25){
            return res.status(500).send({status: 'failed', message: 'Password must be 5-25 characters long'})
        } 

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).send({status: 'failed', message: 'User already exists. Please Login'})
        }

        const hashpass = await hashpassword(password)

        const user = await User.create({name, email, password: hashpass, age, profession, gender})

        res.status(200).send({ 
            status: 'Success', 
            message: 'User created successfully',

        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'failed',
            message: 'something went wrong',
            error
        })
    }
}

const login = async (req, res) => {
    try {

        const { email, password } = req.body

        const user = await User.findOne({email})

        if(!email){
            return res.status(400).send({ message: 'please enter email' })
        }
        if(!password){
            return res.status(400).send({ message: 'please enter password' })
        }
       
        if(!user){
            return res.status(400).send({ message: 'User does not exists, please register to continue' })
        }

        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(404).send({status: 'failed', message: "Email or Password invalid !"})
        }

        const JWT_KEY = process.env.JWTSECRETKEY
        const token = await JWT.sign({ _id: user._id }, JWT_KEY, { expiresIn: '1d' })

        res.status(200).send({
            status: 'success',
            message: 'Login Successfull',
            id: user._id,
            email: user.email,
            name: user.name,
            age: user.age,
            profession: user.profession,
            gender: user.gender,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(501).send({
            message: "Something went wrong",
            error,
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id

        const user = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true })

        res.status(200).send({
            status: 'success',
            message: 'User Updated Successfully',
            user
        })

    } catch (error) {
        console.log(error)
        res.status(501).send({
            message: "Something went wrong",
            error,
        })
    }
}

const getUser = async (req, res) => {
    try {
        const id = req.params.id

        const user = await User.findById(id)

        res.status(200).send({
            status: 'success',
            message: 'User Fetch successfully',
            user
        })

    } catch (error) {
        console.log(error)
        res.status(501).send({
            message: "Something went wrong",
            error,
        })
    }
}

module.exports = {createUser , login, updateUser, getUser}