const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectToDb = require('./db.js')
const userRoute = require('./route/userRoute.js')

connectToDb()

dotenv.config()

const app = express()

app.use(express.json())

app.use(cors())
app.use('/api/v1/auth', userRoute)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})