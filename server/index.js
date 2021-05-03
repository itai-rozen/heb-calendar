const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT || 5000
const reminders = require('./routes/api/reminders.js')
app.use('/api/reminders', reminders)
app.listen(port, () => console.log(`server listens on ${port}`))


