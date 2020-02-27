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

exports.report = function (req, res) {
    const nodemailer = require("nodemailer");

    nodemailer.createTestAccount((err, account) => {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: 'matcha42.contact@gmail.com', // generated ethereal user
              pass: 'Matchacontact42' // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let info = {
            from: '"Matcha 🥰" <matcha42.contact@gmail.com>', // sender address
            to: 'matcha42.contact@gmail.com', // list of receivers
            subject: "Report faux compte utilisateur ✅", // Subject line
            html: '<html><head></head><body><h1>❌<span style="color:#E83E8C">' + req.params.pseudo + '</span>❌</h1></body></html>' // html body
        };

        transporter.sendMail(info, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log("Message sent: %s", info.messageId);
        })
    })
};

exports.removeInteraction = function (req, res) {    
    Interaction.deleteOne({
        from: req.body.from,
        to: req.body.to,
        data: req.body.data
    }, function (err, inter) {
        if (err)
            res.send(err);        
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

exports.isBlock = function (req, res) {
    Interaction.find({
        $and: [
            {from: req.params.pseudo1, to: req.params.pseudo2},
            {data: 'block'}
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

exports.getBlock = function (req, res) {
    Interaction
    .find({
        from: req.params.pseudo,
        data: 'block'
    })
    .exec(function (err, interactions) {
        let arr = []
        interactions.map(res => {
            arr.push(res.to)
        })
        
        if (err) {
            res.json({
                status: "error",
                message: err
            });
        }
        res.json({
            block: arr
        });
    });
};

exports.getBlockMe = function (req, res) {
    Interaction
    .find({
        to: req.params.pseudo,
        data: 'block'
    })
    .exec(function (err, interactions) {
        let arr = []
        interactions.map(res => {
            arr.push(res.from)
        })
        
        if (err) {
            res.json({
                status: "error",
                message: err
            });
        }
        res.json({
            block: arr
        });
    });
};

exports.getLastView = function (req, res) {
    Interaction
    .find({
        from: req.params.pseudo,
        data: 'view'
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

exports.getLastLike = function (req, res) {
    Interaction
    .find({
        from: req.params.pseudo,
        data: 'like'
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