const { Partitura } = require('./module/Partitura')
const path = require('path')

// Estancia o Objeto
let part = new Partitura(path.join(__dirname + '/parts/partitura.musicxml'))

// Inicializa
part.inicializar().then(() => {
    // Sua Lógica

    // Salva
    part.salvarXML(path.join(__dirname + '/parts/music.musicxml'))
})

