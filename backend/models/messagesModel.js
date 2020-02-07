var mongoose = require('mongoose');
// Setup schema
var messageSchema = mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    }
},
{
    timestamps: {
        createdAt: 'createdAt'
    }
});
// Export Contact model
var Message = module.exports = mongoose.model('messages', messageSchema);
module.exports.get = function (callback, limit) {
    Message.find(callback).limit(limit);
}