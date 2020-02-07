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

exports.countLike = function (req, res) {
    Interaction.find({data: 'like', to: req.params.email}).countDocuments(function (err, interactions) {
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
            {from: req.params.email1, to: req.params.email2},
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
        to: req.params.email
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