const express = require('express')

const port = 3001
const server = express()
server.use(express.json())

const list = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

server.get('/api/persons', (_, res) => res.json(list))

server.get('/info', (_, res) => {
    res.send(`<p>Phonebook has info for ${list.length} people</p><p>${new Date()}<p/>`)
})

server.get('/api/persons/:id', (req, res) =>  {
    const id = Number(req.params.id)
    const entry = list.find(l => l.id === id)
    entry ? res.json(entry) : res.status(404).send("Entry not found")
})

server.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    list.splice(list.findIndex(i => i.id === id), 1)
    res.status(204).end()
})

server.post('/api/persons', (req, res) => {
    const body = req.body
    if(!body?.name) {
        return res.status(400).json({error: "Did not contain name of person"})
    }
    if (!body?.number) {
        return res.status(400).json({error: "Did not contain number of person"})
    }
    if(list.find(l => l.name === body.name)) return res.status(400).json({error: "Name already exists"})
    const entry = {
        id: Math.round(Math.random() * 1000000),
        name: body.name,
        number: body.number
    }
    res.json(entry)
})

server.listen(port)
