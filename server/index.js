const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = 3030
const bodyParser = require('body-parser')
const config = require('./config/index')
const seederService = require('./services/seeder.service');
const cookieParser = require('cookie-parser');
var cors = require('cors')

mongoose.connect(config.dbConnection, { useNewUrlParser: true})

app.use(bodyParser.json())
app.use(cookieParser())


const corsConfig = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
}


app.use(corsConfig);

const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

if (config.seedData) {
    seederService.seedData()
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))