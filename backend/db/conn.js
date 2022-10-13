const mongoose = require('mongoose')

async function main(){
    await mongoose.connect('mongodb://localhost:27017/adote')
    console.log('Conectado ao MongoDB')
}

main().catch((err) => console.log(err))

module.exports = mongoose