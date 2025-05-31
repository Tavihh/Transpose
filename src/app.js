// importações
const { Partitura } = require('./modules/Partitura.js')
const instrumentos = require('./models/Instrumento.js')
const path = require('path')
const app = require('./config/config.js')


// rotas
app.get('/', (req, res) => {
    res.render('index')
})

// Outros
const PORTA = 2020
app.listen(PORTA, () => {
    console.log(`Servidor rodando em: http://localhost:${PORTA}`)
})

