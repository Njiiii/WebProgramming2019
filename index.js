const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Person = require('./models/person')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))


const formatPerson = (person) => {
    const formattedPerson = { ...person._doc, id: person._id}
    delete formattedPerson._id
    delete formattedPerson.__v

    return formattedPerson
}

//Handler that fetches all persons from database
app.get('/api/persons', (reg, res) => {
    Person  
        .find({}, {__v: 0})
        .then(persons => {
            res.json(persons.map(formatPerson))
        })
})

//Display only single person in localhost:3001/api/persons/[id]
app.get('/api/persons/:id', (req, res) => {
    Person  
        .findById(req.params.id)
        .then(person => {
            if(person) {
                res.json(formatPerson(person))
            }else{
                res.status(404).end()
            }
        })
        //if person is not found, display error 404
        .catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id' })
        })
})

//Delete person from the database
app.delete('/api/persons/:id', (req, res) => {
    Person  
        .findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error =>{
            res.status(400).send({ error: 'malformatted id' })
        })
})

//Create new person
app.post('/api/persons', (req, res) => {
    const body = formatPerson(req.body)
    
    if(body.name === undefined) {
        return res.status(400).json({error: 'name missing'})
    }

    const person = new Person({
        name: body.name,
        number: body.number,
        id: body.id
    })

    person
        .save()
        .then(savedPerson => {
            res.json(formatPerson(savedPerson))
        })
})

//Update persons number
app.put('/api/persons/:id', (req, res) => {
    const body = req.body
    const number = body.number

    const person = {
        name: body.name,
        number: body.number
    }

    Person
        .findByIdAndUpdate(req.params.id, person, { new: number })
        .then(updatedPerson => {
            res.json(formatPerson(updatedPerson))
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id' })
        })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('Server running in port ' + PORT)
})