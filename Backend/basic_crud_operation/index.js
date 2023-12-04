require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoute = require('./routes/userRoute')

const app = express()

const url = process.env.mongodbURL
const port = process.env.PORT || 3000

mongoose.connect(url)
const con = mongoose.connection

con.on('open', () => {
    console.log("connected");
})

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.sendFile('view/index.html', { root : __dirname})
})

app.use('/user', userRoute)

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})
