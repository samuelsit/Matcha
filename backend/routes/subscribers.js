const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch(err) {
        res.status(500).json({ message: err.message})
    }
})

router.get('/:id', (req, res) => {
})

router.post('/', async (req, res) => {
    console.log("User", req.body)
    const subscriber = new Subscriber({
        user: req.body.user,
        password: req.body.pwd,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthday: req.body.birthday,
    })   
    
    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.patch('/:id', (req, res) => {
})

router.delete('/:id', (req, res) => {
})

module.exports = router