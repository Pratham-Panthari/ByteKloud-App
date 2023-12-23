const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const URI = process.env.MONGODBURI

const connectToDb = async() => {
    try {
        await mongoose.connect(URI)
        console.log('Connected to Database')
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectToDb