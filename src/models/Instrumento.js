// importações
const { DataTypes } = require('sequelize')
const db = require('./db')

const Instrumento = db.define('Instrumentos', {
    partName: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    partAbbreviation: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    instrumentName: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    instrumentSound: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    diatonic: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    chromatic: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    octaveChange: {
        type:DataTypes.STRING,
        allowNull: false,
    }
})

Instrumento.sync().then(() => {
    console.log('Tabela "Instrumentos" On')
}).catch((err) => {
    console.log('Tabela "Instrumentos" Off')
})

module.exports = Instrumento