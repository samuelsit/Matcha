const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    subscribeDate: {
        type: Date,
        required: true,
        default: Date.now
    }

})

module.exports = mongoose.model('Subscriber', subscriberSchema)