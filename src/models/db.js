// importações
const { Sequelize } = require('sequelize')
// config
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
    logging: false
})

// autenticando
sequelize.authenticate().then(() => {
    console.log('SqLite On')
}).catch((err) => {
    console.log("SqLite Off")
})
// exportações
module.exports = sequelize