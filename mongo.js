const mongoose = require('mongoose')

const url = 'mongodb+srv://Niko:[salasana]@web-ohjelmointi-part3-k4fkx.mongodb.net/part3-persons'

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number
})

const Person = mongoose.model('Person', personSchema);

//args is the command line arguments
const args = process.argv

const nam = args[2]
const pho = args[3]
const iidee = args[4]

const person = new Person({
    name: nam,
    number: pho,
    id: iidee
})

//If all necessary commandline parameters are found, add person to database
if(nam != null && pho != null && iidee != null){
    //Save person to the database 
    person
        .save()
        .then(response => {
            console.log('person saved')
            mongoose.connection.close()
        })
        .catch(error => {
            console.log(error)
        })
    }

//Ohterwice list all database entries    
else{
    //List all database entries
    Person
        .find({})
        .then(result => {
            result.forEach(person => {
                console.log(person)
                mongoose.connection.close()
            })
        })
    }