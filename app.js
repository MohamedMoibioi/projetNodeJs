const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/expressmonprojet'

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connecté...')
})

app.use(express.json())

const produitRouter = require('./routes/produits')
app.use('/produits',produitRouter)

const userRouter = require('./routes/users')
app.use('/users',userRouter)

app.listen(9000, () => {
    console.log('Server demaré')
})