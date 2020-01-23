require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
const http = require('http')
const {setupWebsocket} = require('./websocket')

const app  = express()
const server = http.Server(app)

setupWebsocket(server)

mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/', express.static(__dirname + "/../../web/build"))
const port = process.env.PORT || 3333
server.listen(port, function () {
console.log(`Servidor executando em ${port}`)
})