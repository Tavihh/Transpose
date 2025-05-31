// importações
const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const path = require('path')

// config
app.engine('handlebars', handlebars.engine({defaultLayout:'main'}))
app.set('view engine', 'handlebars')
// json
app.use(express.urlencoded({extended:true}))
app.use(express.json())
// public
app.use(express.static(path.join(__dirname,'../Public')))
app.set('views', 'src/views')


module.exports = app