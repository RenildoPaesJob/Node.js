const { application } = require('express')
let express = require('express')
let app     = express.Router()

app.get('/', (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  // res.end(JSON.stringify({
  res.json({
    users: {
      name: 'Renildo',
      email: 'renildo@gmail.com',
      id: 1
    }
  })
})

app.get('/admin', (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.json({
    users: []
  })
})

module.exports = app