Interaction = require('../models/interactionsModel');

// Handle create messages actions and send mail
exports.newInteraction = function (req, res) {
    var interaction = new Interaction();
    interaction.from = req.body.from
    interaction.to = req.body.to
    interaction.data = req.body.data
    interaction.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            interaction
        });
    });
};

exports.removeInteraction = function (req, res) {
    console.log(req.body);
    
    Interaction.deleteOne({
        from: req.body.from,
        to: req.body.to,
        data: req.body.data
    }, function (err, inter) {
        if (err)
            res.send(err);
        console.log(inter);
        
        res.json({
            status: "success",
            message: 'Like deleted'
        });
    });
};

exports.countLike = function (req, res) {
    Interaction.find({data: 'like', to: req.params.pseudo}).countDocuments(function (err, interactions) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
        }
        res.json({
            interactions
        });
    });
};

exports.isMatch = function (req, res) {
    Interaction.find({
        $and: [
            {from: req.params.pseudo1, to: req.params.pseudo2},
            {data: 'like'}
        ]
    }).countDocuments(function (err, interactions) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
        }
        res.json({
            interactions
        });
    });
};

exports.getLastNotifications = function (req, res) {
    Interaction
    .find({
        to: req.params.pseudo
    })
    .sort({createdAt: -1})
    .exec(function (err, interactions) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
        }
        res.json({
            interactions
        });
    });
};