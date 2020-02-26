var mongoose = require('mongoose');
// Setup schema
var memberSchema = mongoose.Schema({
    pseudo: {
        type: String,
        required: false
    },
    popularity: {
        type: Number,
        required: false
    },
    isLoggued: {
        type: Boolean,
        required: false
    },
    interet: {
        type: String,
        required: false
    },
    biographie: {
        type: String,
        required: false
    },
    attirance: {
        male: {
            type: Boolean,
            required: false
        },
        female: {
            type: Boolean,
            required: false
        }
    },
    myGender: {
        type: String,
        required: true
    },
    birthday: {
        day: {
            type: Number,
            required: true
        },
        month: {
            type: Number,
            required: true
        },
        year: {
            type: Number,
            required: true
        }
    },
    country: {
        name: {
            type: String,
            required: false
        },
        lng: {
            type: Number,
            required: true
        },
        lat: {
            type: Number,
            required: true
        }
    },
    lastname: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    isValid: {
        type: Boolean,
        required: true
    },
    pictures: {
        _1: {
            type: String,
            required: false
        },
        _2: {
            type: String,
            required: false
        },
        _3: {
            type: String,
            required: false
        },
        _4: {
            type: String,
            required: false
        },
        _5: {
            type: String,
            required: false
        }
    },
    isNotif: {
        type: Boolean,
        required: false
    },
    isMessage: {
        type: Boolean,
        required: false
    }
},
{
    timestamps: {
        createdAt: 'createdAt'
    }
});
// Export Contact model
var Member = module.exports = mongoose.model('members', memberSchema);
module.exports.get = function (callback, limit) {
    Member.find(callback).limit(limit);
}