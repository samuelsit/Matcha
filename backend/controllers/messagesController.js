Message = require('../models/messagesModel');

// Handle create messages actions and send mail
exports.newMessage = function (req, res) {
    var message = new Message();
    message.from = req.body.from
    message.to = req.body.to
    message.data = req.body.data
    message.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message
        });
    });
};

exports.getMessagesWith = function (req, res) {    
    Message.find({
        $or: [
            {$and: [{from: req.params.pseudo1}, {to: req.params.pseudo2}]},
            {$and: [{to: req.params.pseudo1}, {from: req.params.pseudo2}]}
        ]
    }).sort({
        createdAt: 1
    }).exec(function (err, messages) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
        }
        res.json({
            messages
        });
    });
};

exports.isMessage = function (req, res) {    
    Message.find({
        $or: [
            {$and: [{from: req.params.pseudo1}, {to: req.params.pseudo2}]},
            {$and: [{to: req.params.pseudo1}, {from: req.params.pseudo2}]}
        ]
    }).countDocuments(function (err, messages) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
        }
        if (messages >= 1) {
            res.json({
                data: true
            });
        }
        else {
            res.json({
                data: false
            });
        }
    });
};

exports.getLastMessages = function (req, res) {
    var messageUsers = []
    var lastMessages = []
    Message
    .find({
        $or: [
            {from: req.params.pseudo},
            {to: req.params.pseudo}
        ]
    })
    .sort({createdAt: -1})
    .exec(function (err, messages) {
        var arr = []
        if (err) {
            res.json({
                status: "error",
                message: err
            });
        }
        for(var j in messages) {
            arr.push(messages[j]);
        }
        
        arr.forEach(element => {
            if (messageUsers.includes(element.to) === false && element.to !== req.params.pseudo) {
                messageUsers.push(element.to, element.createdAt, element.data)
            }
            if (messageUsers.includes(element.from) === false && element.from !== req.params.pseudo) {
                messageUsers.push(element.from, element.createdAt, element.data)
            }
        });
        for (let index = 0; index < (messageUsers.length - 2); index++) {
            if (index % 3 === 0) {
                var item = {
                    user: messageUsers[index],
                    date: messageUsers[index+1],
                    data: messageUsers[index+2]
                }
                lastMessages.push(item)
            }
        }
        res.json({
            lastMessages
        });
    });
};