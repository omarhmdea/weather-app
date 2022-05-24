// Server setup
const express = require('express')
const app = express()
const api = require('./server/routes/api')
const bodyParser = require('body-parser')
const path = require("path")




//paresr
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname,"dist")))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use('/', api)



const port = 3000
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})