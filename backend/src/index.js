require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')

const app  = express()

mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/', express.static(__dirname+"/../../web/dist/index.html"))
const port = process.env.PORT || 3333
app.listen(port, function () {
console.log(`Servidor executando em ${port}`)
})