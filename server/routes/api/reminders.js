const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()
router.get('/', async (req,res)=>{
    const reminders = await loadReminderCollection()
    res.send(await (await reminders.find({}).sort({time : 1}).toArray()))
})

router.post('/', async (req,res)=> {
    const reminders = await loadReminderCollection()
    await reminders.insertOne({
        text: req.body.text,
        time: req.body.time,
        date: req.body.date,
        hebDate: req.body.hebDate,
        isAnnual: req.body.isAnnual,
        isAnnualHeb: req.body.isAnnualHeb,
        createdAt: new Date()
    })
    res.status(201).send()
})

router.patch('/:id', async(req,res) => {
    const reminders = await loadReminderCollection()
    console.log('entered server edit reminder')
    await reminders.updateOne({
        _id :  new mongodb.ObjectID(req.params.id)
    },
    {
        $set : {
             "text" : req.body.text,
             "time" : req.body.time,
             "date" : req.body.date,
             "hebDate": req.body.hebDate,
             "isAnnual": req.body.isAnnual,
             "isAnnualHeb": req.body.isAnnualHeb,
            "updatedAt" : new Date()
    }
    })
    res.status(200).send()

})

router.delete('/:id', async(req,res) => {
    const reminders = await loadReminderCollection()
    await reminders.deleteOne({
        _id :  new mongodb.ObjectID(req.params.id)
    })
    res.status(200).send()
    
})

async function loadReminderCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://itai_rozen:1234@cluster0.sihrb.mongodb.net/Calendar?retryWrites=true&w=majority',
    {useNewUrlParser : true,  useUnifiedTopology: true  })

    return client.db('Calendar').collection('reminders')
}

module.exports = router