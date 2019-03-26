const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

let persons = [
      {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
      },
      {
        name: "Martti Tienari",
        number: "040-123456",
        id: 2
      },
      {
        name: "Arto Järvinen",
        number: "040-123456",
        id: 3
      },
      {
        name: "Lea Kutvonen",
        number: "040-123456",
        id: 4
      }
    ]

    app.get('/', (req, res) => {
        res.send('<p>Tietokanta löytyy localhost:3001/persons</p> <a href="localhost:3001/persons">persons database</a>')
    })
  
    app.get('/persons', (reg, res) => {
        res.json(persons)
    })

    app.get('/persons/:id', (reg, res) => {
        const id = Number(reg.params.id)
        const person = persons.find(person => person.id === id)
        
        if( person ) {
            res.json(person)
        } else{
            res.status(404).end()
        }
    })

    app.delete('/persons/:id', (req, res) => {
        const id = Number(req.params.id)
        persons = persons.filter(person => person.id !== id)

        res.status(204).end()
    })

    app.post('/persons', (req, res) => {
        const body = req.body
        
        if(body.name === undefined) {
            return res.status(400).json({error: 'name missing'})
        }

        if(persons.includes(body.name)) {
            return res.status(400).json({error: 'name must be unique'})
        }

        const person = {
            name: body.name,
            number: body.number,
            id: generateID()
        }

        persons = persons.concat(person)

        res.json(person)
        
    })

    const generateID = () => {
        const maxID = persons.length > 0 ? persons.map(p => p.id).sort((a, b) => a - b).reverse()[0] : 1
        return maxID + 1
    }

    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
        console.log('Server running in port ' + PORT)
    })
