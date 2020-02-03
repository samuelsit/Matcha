Member = require('../models/membersModel');

// Handle index actions
exports.allMember = function (req, res) {
    Member.get(function (err, members) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
        }
        res.json({
            members
        });
    });
};
// Handle create members actions and send mail
exports.newMember = function (req, res) {
    const nodemailer = require("nodemailer");
    var member = new Member();
    member.isLoggued = req.body.isLoggued;
    member.popularity = req.body.popularity;
    member.interet = req.body.interet;
    member.attirance = req.body.attirance;
    member.myGender = req.body.myGender;
    member.birthday = req.body.birthday;
    member.country = req.body.country;
    member.lastname = req.body.lastname;
    member.firstname = req.body.firstname;
    member.email = req.body.email;
    member.password = req.body.password;
    member.token = req.body.token;
    member.isValid = req.body.isValid;
    member.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            member
        });
    });

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
            to: req.body.email, // list of receivers
            subject: "Confirmation de votre inscription sur matcha ✅", // Subject line
            html: '<html><head></head><body><h1>Bienvenue sur <span style="color:#E83E8C">Matcha</span> ' + req.body.firstname + ',</h1><p>Pour activer votre compte, veuillez cliquer sur le lien ci dessous<br>ou le copier/coller dans votre navigateur.<br><br><span style="color:#E83E8C">http://localhost:3000/mail-validation?mail=' + req.body.email + '&token=' + req.body.token + '</span><br><br>------------------------------------------------------------------------------<br>Ceci est un mail automatique, Merci de ne pas y répondre.</p></body></html>' // html body
        };

        transporter.sendMail(info, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log("Message sent: %s", info.messageId);
        })
    })
};

// Handle view member info
exports.oneMember = function (req, res) {
    Member.findOne({email: req.params.email}, function (err, member) {
        if (err)
            res.send(err);
        res.json({
            member
        });
    });
};
// Handle update member info
exports.changeStatus = function (req, res) {
    Member.findOne({email: req.params.email}, function (err, member) {
        if (err)
            res.send(err);
        member.isLoggued = req.params.status;
        member.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                member
            });
        });
    });
};

exports.isMember = function (req, res) {
    Member.findOne({email: req.params.email}, function (err, members) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
        }
        if (members) {
            res.json({
                status: "email already exist",
                pass: members.password
            });
        }
        else {
            res.json({
                status: "email not exist"
            });
        }
    });
};

exports.isValidToken = function (req, res) {
    Member.findOne({email: req.params.email}, function (err, member) {
        if (err)
            res.send(err);
        if (!member) {
            res.json({
                data: false
            });
        }
        else {
            if (req.params.token === member.token) {
                res.json({
                    data: true
                });
            }
            else {
                res.json({
                    data: false
                });
            }
        }
    });
};

exports.changeToken = function (req, res) {
    Member.findOne({email: req.params.email}, function (err, member) {
        if (err)
            res.send(err);
        member.token = req.params.token;
        member.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                member
            });
        });
    });
};

exports.isValidMember = function (req, res) {
    Member.findOne({email: req.params.email}, function (err, member) {
        if (err)
            res.send(err);
        if (!member) {
            res.json({
                data: false
            });
        }
        else {
            if (member.isValid === true) {
                res.json({
                    data: true
                });
            }
            else {
                res.json({
                    data: false
                });
            }
        }
    });
};

exports.changeIsValid = function (req, res) {
    Member.findOne({email: req.params.email}, function (err, member) {
        if (err)
            res.send(err);
        member.isValid = req.params.status;
        member.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                member
            });
        });
    });
};

exports.changeMemberProfile = function (req, res) {
    Member.findOne({email: req.params.email}, function (err, member) {
        if (err)
            res.send(err);
        member.lastname = req.body.lastname;
        member.firstname = req.body.firstname;
        member.biographie = req.body.biographie;
        member.birthday.day = req.body.birthday.day;
        member.birthday.month = req.body.birthday.month;
        member.birthday.year = req.body.birthday.year;
        member.attirance.female = req.body.attirance.female;
        member.attirance.male = req.body.attirance.male;
        member.interet = req.body.interet;
        member.myGender = req.body.myGender;
        member.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                member
            });
        });
    });
};

////
// Handle delete contact
// exports.delete = function (req, res) {
//     Member.remove({
//         _id: req.params.member_id
//     }, function (err, member) {
//         if (err)
//             res.send(err);
//         res.json({
//             status: "success",
//             message: 'Contact deleted'
//         });
//     });
// };