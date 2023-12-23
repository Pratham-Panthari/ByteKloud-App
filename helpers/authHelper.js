const bcrypt = require('bcryptjs')

const hashpassword = async (password) => {
    try {
        const salt = 10
        const hashedpassword = await bcrypt.hash(password, salt)
        return hashedpassword
    } catch (error) {
        console.log(error)
        return error
    }
}

const comparePassword = async (password, hashPassword) => {
    try {
        return await bcrypt.compare(password, hashPassword)
    } catch (error) {
        console.log(error)
        return error
    }
    
} 

module.exports = { hashpassword, comparePassword }