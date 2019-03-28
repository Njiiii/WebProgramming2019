const mongoose = require('mongoose')

const dbUrl = 'mongodb+srv://Niko:[salasana]@web-ohjelmointi-part3-k4fkx.mongodb.net/part3-persons'
mongoose.connect(dbUrl)

const Person = mongoose.model('Person', {
    name: String,
    number: String,
    id: Number
})

module.exports = Person