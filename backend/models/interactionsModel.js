var mongoose = require('mongoose');
// Setup schema
var interactionSchema = mongoose.Schema({
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
var Interaction = module.exports = mongoose.model('interactions', interactionSchema);
module.exports.get = function (callback, limit) {
    Interaction.find(callback).limit(limit);
}