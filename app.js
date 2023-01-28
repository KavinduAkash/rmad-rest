require('dotenv').config()
const express = require('express')
const app = express()

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    next()
})

const mongoose = require('mongoose')
// mongodb://
// mongodb+srv://
// connect to the mongodb
// mongoose.connect('mongodb://localhost/sclsystem', {useNewUrlParser: true})
console.log(process.env.DB_URL)
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true})
// get db connection
const db = mongoose.connection
// catch db connecting error
db.on('error', (error) => console.log(error))
// detect db connecting when complete
db.on('open', () => console.log("Connected to the database successfully!"))

app.use(express.json())

const studentRoute = require('./routes/student.route')
app.use('/student', studentRoute)

const subjectSchema = require('./routes/subject.route')
app.use('/subject', subjectSchema)

app.use((req, res) => {
    res.status.json({success: false})
})

app.listen(3001, () => {
    console.log('Backend server started...')
})
