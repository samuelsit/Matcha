Member = require('../models/membersModel');

const sharp = require('sharp')
const fs = require('fs')

// Handle index actions
exports.allMember = function (req, res) {
    var memberLog = '^' + req.params.email + '$'
    var regex = new RegExp(memberLog)
    Member.find({email: {$not: regex}}, function (err, members) {
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
    member.biographie = req.body.biographie;
    member.pictures._1 = req.body.pictures._1;
    member.pictures._2 = req.body.pictures._2;
    member.pictures._3 = req.body.pictures._3;
    member.pictures._4 = req.body.pictures._4;
    member.pictures._5 = req.body.pictures._5;
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
        if (members !== null) {
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
        if (req.body.lastname)
            member.lastname = req.body.lastname;
        if (req.body.firstname)
            member.firstname = req.body.firstname;
        if (req.body.biographie)
            member.biographie = req.body.biographie;
        if (req.body.birthday.day)
            member.birthday.day = req.body.birthday.day;
        if (req.body.birthday.month)
            member.birthday.month = req.body.birthday.month;
        if (req.body.birthday.year)
            member.birthday.year = req.body.birthday.year;
        if (req.body.interet)
            member.interet = req.body.interet;
        if (req.body.myGender)
            member.myGender = req.body.myGender;
        if (!req.body.attirance.male && !req.body.attirance.female) {
            member.attirance.male = true;
            member.attirance.female = true;
        }
        else {
            member.attirance.male = req.body.attirance.male;
            member.attirance.female = req.body.attirance.female;
        }
        member.save(function (err) {
            if (err)
                res.json(err);            
            res.json({
                member
            });
        });
    });
};

exports.changeMemberPictures = function (req, res) {
    Member.findOne({email: req.params.email}, function (err, member) {
        if (err)
            res.send(err);

        sharp(req.file.path)
        .resize(954, 635)
        .toBuffer((err, buffer) => {
            fs.writeFile(req.file.path, buffer, function(e) {
            });
        })

        if (req.params.id === '_1') {
            member.pictures._1 = req.file.filename;
        }
        if (req.params.id === '_2') {
            member.pictures._2 = req.file.filename;
        }
        if (req.params.id === '_3') {
            member.pictures._3 = req.file.filename;
        }
        if (req.params.id === '_4') {
            member.pictures._4 = req.file.filename;
        }
        if (req.params.id === '_5') {
            member.pictures._5 = req.file.filename;
        }
        member.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                member
            });
        });
    });
};

exports.isProfilePicture = function (req, res) {
    Member.findOne({email: req.params.email}, function (err, member) {
        if (member) {
            if (err) {
                res.json({
                    status: "error",
                    message: err
                });
            }
            else if (member.pictures._1 !== '') {
                res.json({
                    status: true
                });
            }
            else {
                res.json({
                    status: false
                });
            }
        }
        else {
            res.json({
                status: false
            });
        }
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