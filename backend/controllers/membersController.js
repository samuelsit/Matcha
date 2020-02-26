Member = require('../models/membersModel');

const sharp = require('sharp')
const fs = require('fs')

// Handle index actions
exports.allMember = function (req, res) {    
    var memberLog = '^' + req.params.pseudo + '$'
    var regex = new RegExp(memberLog)
    let {attirance, myGender} = req.body
    
    if (!attirance.male && attirance.female) {
        Member
        .find({
            pseudo: {$not: regex},
            $or: [
                {attirance: { male: true , female: true }},
                {attirance: { male: myGender === 'male' ? true : false , female: false }},
                {attirance: { male: myGender === 'male' ? true : false , female: true }}
            ],
            myGender: 'female',
            'pictures._1':  {$ne: '' }
        }, function (err, members) {
            if (err) {
                res.json({
                    status: "error",
                    message: err
                });
            }
            res.json({
                members
            });
        })
        .sort({isLoggued: -1})
    }
    else if (attirance.male && !attirance.female) {
        Member
        .find({
            pseudo: {$not: regex},
            $or: [
                {attirance: { male: true , female: true }},
                {attirance: { male: myGender === 'male' ? true : false , female: false }},
                {attirance: { male: myGender === 'male' ? true : false , female: true }}
            ],
            myGender: 'male',
            'pictures._1':  {$ne: '' }
        }, function (err, members) {
            if (err) {
                res.json({
                    status: "error",
                    message: err
                });
            }
            res.json({
                members
            });
        })
        .sort({isLoggued: -1})
    }
    else {
        Member
        .find({
            pseudo: {$not: regex},
            $or: [
                {attirance: { male: true , female: true }},
                {attirance: { male: myGender === 'male' ? true : false , female: false }},
                {attirance: { male: myGender === 'male' ? true : false , female: true }}
            ],
            'pictures._1':  {$ne: '' }
        }, function (err, members) {
            if (err) {
                res.json({
                    status: "error",
                    message: err
                });
            }
            res.json({
                members
            });
        })
        .sort({isLoggued: -1})
    }
};

exports.forgetPass = function (req, res) {
    const nodemailer = require("nodemailer");
    Member.findOne({email: req.params.email}, function (err, member) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
        }
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
                to: member.email, // list of receivers
                subject: "Changement de votre mot de passe ✅", // Subject line
                html: '<html><head></head><body><h1>Bonjour, <span style="color:#E83E8C">' + member.firstname + '</span>,</h1><p>Pour changer votre mot de passe, veuillez cliquer sur le lien ci dessous<br>ou le copier/coller dans votre navigateur.<br><br><span style="color:#E83E8C">http://localhost:3000/reinitialisation?pseudo=' + member.pseudo + '&token=' + member.token + '</span><br><br>------------------------------------------------------------------------------<br>Ceci est un mail automatique, Merci de ne pas y répondre.</p></body></html>' // html body
            };
    
            transporter.sendMail(info, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log("Message sent: %s", info.messageId);
            })
        })
        res.json({
            data: 'send'
        });
    });
};

exports.isCountry = function (req, res) {
    Member.findOne({pseudo: req.params.pseudo}, function (err, member) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
        }
        if (member.country.name === '' ||
            member.country.lat === 0 ||
            member.country.lng === 0) {
            res.json({
                data: false
            });
        }
        else {
            res.json({
                data: true
            });
        }
    });
};

exports.getCountry = function (req, res) {
    Member.findOne({pseudo: req.params.pseudo}, function (err, member) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
        }
        if (member.country.name === '' ||
            member.country.lat === 0 ||
            member.country.lng === 0) {
            res.json({
                data: false
            });
        }
        else {
            res.json({
                lng: member.country.lng,
                lat: member.country.lat
            });
        }
    });
};

// Handle create members actions and send mail
exports.newMember = function (req, res) {
    const nodemailer = require("nodemailer");
    var member = new Member();
    member.isLoggued = req.body.isLoggued;
    member.interet = req.body.interet;
    if (!req.body.attirance.male && !req.body.attirance.female) {
        member.attirance.male = true;
        member.attirance.female = true;
    }
    else {
        member.attirance = req.body.attirance
    }
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
    member.pseudo = req.body.pseudo;
    member.popularity = 0;
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
            html: '<html><head></head><body><h1>Bienvenue sur <span style="color:#E83E8C">Matcha</span> ' + req.body.firstname + ',</h1><p>Pour activer votre compte, veuillez cliquer sur le lien ci dessous<br>ou le copier/coller dans votre navigateur.<br><br><span style="color:#E83E8C">http://localhost:3000/mail-validation?pseudo=' + req.body.pseudo + '&token=' + req.body.token + '</span><br><br>------------------------------------------------------------------------------<br>Ceci est un mail automatique, Merci de ne pas y répondre.</p></body></html>' // html body
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
    Member.findOne({pseudo: req.params.pseudo}, function (err, member) {
        if (err)
            res.send(err);
        res.json({
            member
        });
    });
};
// Handle update member info
exports.changeStatus = function (req, res) {
    Member.findOne({pseudo: req.params.pseudo}, function (err, member) {
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
    Member.findOne({pseudo: req.params.pseudo}, function (err, members) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
        }
        if (members !== null) {
            res.json({
                status: "pseudo already exist",
                pass: members.password
            });
        }
        else {
            res.json({
                status: "pseudo not exist"
            });
        }
    });
};

exports.isMemberMail = function (req, res) {
    Member.findOne({email: req.params.email}, function (err, members) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
        }
        if (members !== null) {
            res.json({
                status: "pseudo already exist",
                pass: members.password
            });
        }
        else {
            res.json({
                status: "pseudo not exist"
            });
        }
    });
};

exports.isValidToken = function (req, res) {
    Member.findOne({pseudo: req.params.pseudo}, function (err, member) {
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
    Member.findOne({pseudo: req.params.pseudo}, function (err, member) {
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
    Member.findOne({pseudo: req.params.pseudo}, function (err, member) {
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
    Member.findOne({pseudo: req.params.pseudo}, function (err, member) {
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

exports.changeMemberPop = function (req, res) {
    Member.findOne({pseudo: req.params.pseudo}, function (err, member) {
        if (err)
            res.send(err);
        member.popularity = req.body.popularity
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
    Member.findOne({pseudo: req.params.pseudo}, function (err, member) {
        if (err)
            res.send(err);
        if (req.body.popularity)
            member.popularity = req.body.popularity
        if (req.body.email)
            member.email = req.body.email
        if (req.body.password)
            member.password = req.body.password
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
        if (req.body.country.name)
            member.country.name = req.body.country.name
        if (req.body.country.lng)
            member.country.lng = req.body.country.lng
        if (req.body.country.lat)
            member.country.lat = req.body.country.lat
        member.save(function (err) {
            if (err)
                res.json(err);                      
            res.json({
                member
            });
        });
    });
};

exports.changeMemberPass = function (req, res) {
    Member.findOne({pseudo: req.params.pseudo}, function (err, member) {
        if (err)
            res.send(err);
        if (req.body.password)
            member.password = req.body.password
        member.save(function (err) {
            if (err)
                res.json(err);            
            res.json({
                member
            });
        });
    });
};

exports.changeMemberCountry = function (req, res) {
    Member.findOne({pseudo: req.params.pseudo}, function (err, member) {
        if (err)
            res.send(err);        
        if (req.body.country)
            member.country = req.body.country
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
    Member.findOne({pseudo: req.params.pseudo}, function (err, member) {
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
    Member.findOne({pseudo: req.params.pseudo}, function (err, member) {
        if (member) {
            if (err) {
                res.json({
                    status: "error",
                    message: err
                });
            }
            else if (member.pictures._1 !== '') {
                res.json({
                    status: true,
                    pic: member.pictures._1
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

exports.isPicture2 = function (req, res) {
    Member.findOne({pseudo: req.params.pseudo}, function (err, member) {
        if (member) {
            if (err) {
                res.json({
                    status: "error",
                    message: err
                });
            }
            else if (member.pictures._2 !== '') {
                res.json({
                    status: true,
                    pic: member.pictures._2
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

exports.isPicture3 = function (req, res) {
    Member.findOne({pseudo: req.params.pseudo}, function (err, member) {
        if (member) {
            if (err) {
                res.json({
                    status: "error",
                    message: err
                });
            }
            else if (member.pictures._3 !== '') {
                res.json({
                    status: true,
                    pic: member.pictures._3
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

exports.isPicture4 = function (req, res) {
    Member.findOne({pseudo: req.params.pseudo}, function (err, member) {
        if (member) {
            if (err) {
                res.json({
                    status: "error",
                    message: err
                });
            }
            else if (member.pictures._4 !== '') {
                res.json({
                    status: true,
                    pic: member.pictures._4
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

exports.isPicture5 = function (req, res) {
    Member.findOne({pseudo: req.params.pseudo}, function (err, member) {
        if (member) {
            if (err) {
                res.json({
                    status: "error",
                    message: err
                });
            }
            else if (member.pictures._5 !== '') {
                res.json({
                    status: true,
                    pic: member.pictures._5
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

exports.getNotif = function (req, res) {
    Member
    .findOne({
        pseudo: req.params.pseudo
    }, function (err, member) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
        }
        res.json({
            notif: member.isNotif
        });
    });
};

exports.getNotifMsg = function (req, res) {
    Member
    .findOne({
        pseudo: req.params.pseudo
    }, function (err, member) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
        }
        res.json({
            notif: member.isMessage
        });
    });
};

exports.postNotif = function (req, res) {
    Member.findOne({pseudo: req.params.pseudo}, function (err, member) {
        if (err)
            res.send(err);
        member.isNotif = req.params.status;
        member.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                member
            });
        });
    });
};

exports.postNotifMsg = function (req, res) {
    Member.findOne({pseudo: req.params.pseudo}, function (err, member) {
        if (err)
            res.send(err);
        member.isMessage = req.params.status;
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