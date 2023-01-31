const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extends: true}))
app.use(cors())

const port = process.env.PORT || 5000
const reminders = require('./routes/api/reminders.js')
app.use('/api/reminders', reminders)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public/'))

    app.get('/.*/',(req,res) => res.sendFile(__dirname + '/public/index.html'))
}
app.listen(port, () => console.log(`server listens on ${port}`))


