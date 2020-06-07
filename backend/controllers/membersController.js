const sharp = require('sharp')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const config = require('../config')
const nodemailer = require("nodemailer");
var connection = require('../bdd')

// Handle index actions
exports.allMember = function (req, res) {
    connection.query('SELECT * FROM members WHERE pseudo != ?', [req.params.pseudo], (error, results, fields) => {
        if (error) throw error;
        var memberLog = '^' + req.params.pseudo + '$'
        var regex = new RegExp(memberLog)
        let {attirance, myGender} = req.body
        if (!attirance.male && attirance.female) {
            var members = results
            .filter(el => (
                el.pseudo !== req.params.pseudo &&
                el.myGender === 'female' &&
                el.pic0 !== '' &&
                (el.attiranceMale === 1 && el.attiranceFemale === 1) ||
                (el.attiranceMale === (myGender === 'male' ? 1 : 0) && el.attiranceFemale === 1) ||
                (el.attiranceMale === (myGender === 'male' ? 1 : 0) && el.attiranceFemale === 0)
            ))
            .sort((a, b) => b.isLoggued - a.isLoggued)
            .map(el => ({
                pseudo: el.pseudo,
                popularity: el.popularity,
                isLoggued: el.isLoggued === 1 ? true : false,
                interet: el.interet,
                biographie: el.biographie,
                attirance: {
                    male: el.attiranceMale === 1 ? true : false,
                    female: el.attiranceFemale === 1 ? true : false
                },
                myGender: el.myGender,
                birthday: {
                    day: el.birthday,
                    month: el.birthmonth,
                    year: el.birthyear
                },
                country: {
                    name: el.city,
                    lng: el.lng,
                    lat: el.lat
                },
                lastname: el.lastname,
                firstname: el.firstname,
                email: el.email,
                password: el.password,
                token: el.token,
                isValid: el.isValid === 1 ? true : false,
                isNotif: el.isNotif === 1 ? true : false,
                isMessage: el.isMessage === 1 ? true : false,
                pictures: {
                    _1: el.pic0,
                    _2: el.pic1,
                    _3: el.pic2,
                    _4: el.pic3,
                    _5: el.pic4
                },
                lastVisite: el.lastVisite,
                createdAt: el.createdAt
            }))
        }
        else if (attirance.male && !attirance.female) {
            var members = results
            .filter(el => (
                el.pseudo !== req.params.pseudo &&
                el.myGender === 'male' &&
                el.pic0 !== '' &&
                ((el.attiranceMale === 1 && el.attiranceFemale === 1) ||
                (el.attiranceMale === (myGender === 'male' ? 1 : 0) && el.attiranceFemale === 1) ||
                (el.attiranceMale === (myGender === 'male' ? 1 : 0) && el.attiranceFemale === 0))
            ))
            .sort((a, b) => b.isLoggued - a.isLoggued)
            .map(el => ({
                pseudo: el.pseudo,
                popularity: el.popularity,
                isLoggued: el.isLoggued === 1 ? true : false,
                interet: el.interet,
                biographie: el.biographie,
                attirance: {
                    male: el.attiranceMale === 1 ? true : false,
                    female: el.attiranceFemale === 1 ? true : false
                },
                myGender: el.myGender,
                birthday: {
                    day: el.birthday,
                    month: el.birthmonth,
                    year: el.birthyear
                },
                country: {
                    name: el.city,
                    lng: el.lng,
                    lat: el.lat
                },
                lastname: el.lastname,
                firstname: el.firstname,
                email: el.email,
                password: el.password,
                token: el.token,
                isValid: el.isValid === 1 ? true : false,
                isNotif: el.isNotif === 1 ? true : false,
                isMessage: el.isMessage === 1 ? true : false,
                pictures: {
                    _1: el.pic0,
                    _2: el.pic1,
                    _3: el.pic2,
                    _4: el.pic3,
                    _5: el.pic4
                },
                lastVisite: el.lastVisite,
                createdAt: el.createdAt
            }))
        }
        else {
            var members = results
            .filter(el => (
                el.pseudo !== req.params.pseudo &&
                el.pic0 !== '' &&
                ((el.attiranceMale === 1 && el.attiranceFemale === 1) ||
                (el.attiranceMale === (myGender === 'male' ? 1 : 0) && el.attiranceFemale === 1) ||
                (el.attiranceMale === (myGender === 'male' ? 1 : 0) && el.attiranceFemale === 0))
            ))
            .sort((a, b) => b.isLoggued - a.isLoggued)
            .map(el => ({
                pseudo: el.pseudo,
                popularity: el.popularity,
                isLoggued: el.isLoggued === 1 ? true : false,
                interet: el.interet,
                biographie: el.biographie,
                attirance: {
                    male: el.attiranceMale === 1 ? true : false,
                    female: el.attiranceFemale === 1 ? true : false
                },
                myGender: el.myGender,
                birthday: {
                    day: el.birthday,
                    month: el.birthmonth,
                    year: el.birthyear
                },
                country: {
                    name: el.city,
                    lng: el.lng,
                    lat: el.lat
                },
                lastname: el.lastname,
                firstname: el.firstname,
                email: el.email,
                password: el.password,
                token: el.token,
                isValid: el.isValid === 1 ? true : false,
                isNotif: el.isNotif === 1 ? true : false,
                isMessage: el.isMessage === 1 ? true : false,
                pictures: {
                    _1: el.pic0,
                    _2: el.pic1,
                    _3: el.pic2,
                    _4: el.pic3,
                    _5: el.pic4
                },
                lastVisite: el.lastVisite,
                createdAt: el.createdAt
            }))
        }
        res.json({members: members});
    });
};

exports.forgetPass = function (req, res) {
    connection.query('SELECT * FROM members WHERE email = ?', [req.params.email], (error, results, fields) => {
        if (error) throw error;
        var el = results[0]
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
                to: el.email, // list of receivers
                subject: "Changement de votre mot de passe ✅", // Subject line
                html: '<html><head></head><body><h1>Bonjour, <span style="color:#E83E8C">' + el.firstname + '</span>,</h1><p>Pour changer votre mot de passe, veuillez cliquer sur le lien ci dessous<br>ou le copier/coller dans votre navigateur.<br><br><span style="color:#E83E8C">http://localhost:3000/reinitialisation?pseudo=' + el.pseudo + '&token=' + el.token + '</span><br><br>------------------------------------------------------------------------------<br>Ceci est un mail automatique, Merci de ne pas y répondre.</p></body></html>' // html body
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
    connection.query('SELECT * FROM members WHERE pseudo = ?', [req.params.pseudo], (error, results, fields) => {
        if (error) throw error;
        var member = results[0]
        if (member.city === '' ||
            member.lat === 0 ||
            member.lng === 0) {
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
    connection.query('SELECT * FROM members WHERE pseudo = ?', [req.params.pseudo], (error, results, fields) => {
        if (error) throw error;
        var member = results[0]
        if (member.city === '' ||
            member.lat === 0 ||
            member.lng === 0) {
            res.json({
                data: false
            });
        }
        else {
            res.json({
                lng: member.lng,
                lat: member.lat
            });
        }
    });
};

// Handle create members actions and send mail
exports.newMember = function (req, res) {

    connection.query('INSERT members SET pseudo = ?, lastname = ?, firstname = ?, email = ?, password = ?, createdAt = ?, myGender = ?, attiranceMale = ?, attiranceFemale = ?, biographie = ?, interet = ?, birthday = ?, birthmonth = ?, birthyear = ?, pic0 = ?, pic1 = ?, pic2 = ?, pic3 = ?, pic4 = ?, city = ?, lat = ?, lng = ?, lastVisite = ?, popularity = ?, isLoggued = ?, isValid = ?, isNotif = ?, isMessage = ?, token = ?', [req.body.pseudo, req.body.lastname, req.body.firstname, req.body.email, req.body.password, new Date(), req.body.myGender, !req.body.attirance.male && !req.body.attirance.female ? true : member.attirance.male, !req.body.attirance.male && !req.body.attirance.female ? true : member.attirance.female, req.body.biographie, req.body.interet, req.body.birthday.day, req.body.birthday.month, req.body.birthday.year, req.body.pictures._1, req.body.pictures._2, req.body.pictures._3, req.body.pictures._4, req.body.pictures._5, req.body.country.name, req.body.country.lat, req.body.country.lng, new Date(), 0, req.body.isLoggued, req.body.isValid, false, false, req.body.token], (err) => {
        if (err) throw err;
    })

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
    console.log('appel: ' + req.params.pseudo);
    
    connection.query('SELECT * FROM members WHERE pseudo = ?', [req.params.pseudo], (error, results, fields) => {
        if (error) throw error;
        console.log(results[0]);
        
        let el = results[0]
        let member = {
            pseudo: el.pseudo,
            popularity: el.popularity,
            isLoggued: el.isLoggued === 1 ? true : false,
            interet: el.interet,
            biographie: el.biographie,
            attirance: {
                male: el.attiranceMale === 1 ? true : false,
                female: el.attiranceFemale === 1 ? true : false
            },
            myGender: el.myGender,
            birthday: {
                day: el.birthday,
                month: el.birthmonth,
                year: el.birthyear
            },
            country: {
                name: el.city,
                lng: el.lng,
                lat: el.lat
            },
            lastname: el.lastname,
            firstname: el.firstname,
            email: el.email,
            password: el.password,
            token: el.token,
            isValid: el.isValid === 1 ? true : false,
            isNotif: el.isNotif === 1 ? true : false,
            isMessage: el.isMessage === 1 ? true : false,
            pictures: {
                _1: el.pic0,
                _2: el.pic1,
                _3: el.pic2,
                _4: el.pic3,
                _5: el.pic4
            },
            lastVisite: el.lastVisite,
            createdAt: el.createdAt
        }
        res.json({member: member});
    })
};

// Handle update member info
exports.changeStatus = function (req, res) {
    connection.query('UPDATE members SET isLoggued = ? WHERE pseudo = ?', [req.params.status === false ? 0 : 1, req.params.pseudo], (error, results, fields) => {
        if (error) throw error;
    });
};

exports.authMember = function (req, res) {
    connection.query('SELECT * FROM members WHERE pseudo = ?', [req.body.pseudo], async (error, results, fields) => {
        if (error) throw error;
        let member = results[0]
        console.log(member);
        
        if (member === undefined) {
            res.json({
                exist: false
            });
        }
        let isPass = await bcrypt.compare(req.body.pass, member.password)
        if (isPass === false) {
            res.json({
                pass: false
            });
        }
        else {
            if (member.isValid === 0) {
                res.json({
                    isValid: false
                });
            }
            else {
                connection.query('UPDATE members SET isLoggued = ? WHERE pseudo = ?', [1, req.body.pseudo], (error, results, fields) => {
                    if (error) throw error;
                });
                var token = jwt.sign({ id: member._id }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                if (member.city === '' ||
                    member.lat === 0 ||
                    member.lng === 0) {
                    res.json({
                        isCountry: false
                    });
                }
                else {
                    res.json({
                        lng: member.lng,
                        lat: member.lat,
                        token: token
                    });
                }
            }
        }
        
    });
}

exports.isMember = function (req, res) {
    connection.query('SELECT * FROM members WHERE pseudo = ?', [req.params.pseudo], async (error, results, fields) => {
        if (error) throw error;
        let member = results[0]
        if (member !== undefined) {
            res.json({
                status: "pseudo already exist",
                pass: member.password
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
    connection.query('SELECT * FROM members WHERE email = ?', [req.params.email], async (error, results, fields) => {
        if (error) throw error;
        let member = results[0]
        if (member !== undefined) {
            res.json({
                status: "pseudo already exist",
                pass: member.password
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
    connection.query('SELECT * FROM members WHERE pseudo = ?', [req.params.pseudo], async (error, results, fields) => {
        if (error) throw error;
        let member = results[0]
        if (member === undefined) {
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
    connection.query('UPDATE members SET token = ? WHERE pseudo = ?', [req.params.token, req.body.pseudo], (error, results, fields) => {
        if (error) throw error;
    });
    connection.query('SELECT * FROM members WHERE pseudo = ?', [req.params.pseudo], async (error, results, fields) => {
        if (error) throw error;
        let member = results[0]
        res.json({
            member
        });
    })
};

exports.isValidMember = function (req, res) {
    connection.query('SELECT * FROM members WHERE pseudo = ?', [req.params.pseudo], async (error, results, fields) => {
        if (error) throw error;
        let member = results[0]
        if (member === undefined) {
            res.json({
                data: false
            });
        }
        else {
            if (member.isValid === 1) {
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
    connection.query('UPDATE members SET isValid = ? WHERE pseudo = ?', [req.params.status === false ? 0 : 1, req.params.pseudo], (error, results, fields) => {
        if (error) throw error;
    });
    connection.query('SELECT * FROM members WHERE pseudo = ?', [req.params.pseudo], async (error, results, fields) => {
        if (error) throw error;
        let el = results[0]
        let member = {
            pseudo: el.pseudo,
            popularity: el.popularity,
            isLoggued: el.isLoggued === 1 ? true : false,
            interet: el.interet,
            biographie: el.biographie,
            attirance: {
                male: el.attiranceMale === 1 ? true : false,
                female: el.attiranceFemale === 1 ? true : false
            },
            myGender: el.myGender,
            birthday: {
                day: el.birthday,
                month: el.birthmonth,
                year: el.birthyear
            },
            country: {
                name: el.city,
                lng: el.lng,
                lat: el.lat
            },
            lastname: el.lastname,
            firstname: el.firstname,
            email: el.email,
            password: el.password,
            token: el.token,
            isValid: el.isValid === 1 ? true : false,
            isNotif: el.isNotif === 1 ? true : false,
            isMessage: el.isMessage === 1 ? true : false,
            pictures: {
                _1: el.pic0,
                _2: el.pic1,
                _3: el.pic2,
                _4: el.pic3,
                _5: el.pic4
            },
            lastVisite: el.lastVisite,
            createdAt: el.createdAt
        }
        res.json({
            member: member
        });
    })
};

exports.changeMemberPop = function (req, res) {
    connection.query('UPDATE members SET popularity = ? WHERE pseudo = ?', [req.body.popularity, req.params.pseudo], (error, results, fields) => {
        if (error) throw error;
    });
    connection.query('SELECT * FROM members WHERE pseudo = ?', [req.params.pseudo], async (error, results, fields) => {
        if (error) throw error;
        let el = results[0]
        let member = {
            pseudo: el.pseudo,
            popularity: el.popularity,
            isLoggued: el.isLoggued === 1 ? true : false,
            interet: el.interet,
            biographie: el.biographie,
            attirance: {
                male: el.attiranceMale === 1 ? true : false,
                female: el.attiranceFemale === 1 ? true : false
            },
            myGender: el.myGender,
            birthday: {
                day: el.birthday,
                month: el.birthmonth,
                year: el.birthyear
            },
            country: {
                name: el.city,
                lng: el.lng,
                lat: el.lat
            },
            lastname: el.lastname,
            firstname: el.firstname,
            email: el.email,
            password: el.password,
            token: el.token,
            isValid: el.isValid === 1 ? true : false,
            isNotif: el.isNotif === 1 ? true : false,
            isMessage: el.isMessage === 1 ? true : false,
            pictures: {
                _1: el.pic0,
                _2: el.pic1,
                _3: el.pic2,
                _4: el.pic3,
                _5: el.pic4
            },
            lastVisite: el.lastVisite,
            createdAt: el.createdAt
        }
        res.json({
            member: member
        });
    })
};

exports.changeMemberProfile = function (req, res) {
    if (req.body.popularity)
        connection.query('UPDATE members SET popularity = ? WHERE pseudo = ?', [req.body.popularity, req.params.pseudo], (error, results, fields) => {
            if (error) throw error;
        });
    if (req.body.email)
        connection.query('UPDATE members SET email = ? WHERE pseudo = ?', [req.body.email, req.params.pseudo], (error, results, fields) => {
            if (error) throw error;
        });
    if (req.body.password)
        connection.query('UPDATE members SET password = ? WHERE pseudo = ?', [req.body.password, req.params.pseudo], (error, results, fields) => {
            if (error) throw error;
        });
    if (req.body.lastname)
        connection.query('UPDATE members SET lastname = ? WHERE pseudo = ?', [req.body.lastname, req.params.pseudo], (error, results, fields) => {
            if (error) throw error;
        });
    if (req.body.firstname)
        connection.query('UPDATE members SET firstname = ? WHERE pseudo = ?', [req.body.firstname, req.params.pseudo], (error, results, fields) => {
            if (error) throw error;
        });
    if (req.body.biographie)
        connection.query('UPDATE members SET biographie = ? WHERE pseudo = ?', [req.body.biographie, req.params.pseudo], (error, results, fields) => {
            if (error) throw error;
        });
    if (req.body.birthday.day)
        connection.query('UPDATE members SET birthday = ? WHERE pseudo = ?', [req.body.birthday.day, req.params.pseudo], (error, results, fields) => {
            if (error) throw error;
        });
    if (req.body.birthday.month)
        connection.query('UPDATE members SET birthmonth = ? WHERE pseudo = ?', [req.body.birthday.month, req.params.pseudo], (error, results, fields) => {
            if (error) throw error;
        });
    if (req.body.birthday.year)
        connection.query('UPDATE members SET birthyear = ? WHERE pseudo = ?', [req.body.birthday.year, req.params.pseudo], (error, results, fields) => {
            if (error) throw error;
        });
    if (req.body.interet)
        connection.query('UPDATE members SET interet = ? WHERE pseudo = ?', [req.body.interet, req.params.pseudo], (error, results, fields) => {
            if (error) throw error;
        });
    if (req.body.myGender)
        connection.query('UPDATE members SET myGender = ? WHERE pseudo = ?', [req.body.myGender, req.params.pseudo], (error, results, fields) => {
            if (error) throw error;
        });
    if (!req.body.attirance.male && !req.body.attirance.female) {
        connection.query('UPDATE members SET attiranceMale = ?, attiranceFemale = ? WHERE pseudo = ?', [1, 1, req.params.pseudo], (error, results, fields) => {
            if (error) throw error;
        });
    }
    else {
        connection.query('UPDATE members SET attiranceMale = ?, attiranceFemale = ? WHERE pseudo = ?', [req.body.attirance.male, req.body.attirance.female, req.params.pseudo], (error, results, fields) => {
            if (error) throw error;
        });
    }
    if (req.body.country.name)
        connection.query('UPDATE members SET city = ? WHERE pseudo = ?', [req.body.country.name, req.params.pseudo], (error, results, fields) => {
            if (error) throw error;
        });
    if (req.body.country.lng)
        connection.query('UPDATE members SET lng = ? WHERE pseudo = ?', [req.body.country.lng, req.params.pseudo], (error, results, fields) => {
            if (error) throw error;
        });
    if (req.body.country.lat)
        connection.query('UPDATE members SET lat = ? WHERE pseudo = ?', [req.body.country.lat, req.params.pseudo], (error, results, fields) => {
            if (error) throw error;
        });
    connection.query('SELECT * FROM members WHERE pseudo = ?', [req.params.pseudo], async (error, results, fields) => {
        if (error) throw error;
        let el = results[0]
        let member = {
            pseudo: el.pseudo,
            popularity: el.popularity,
            isLoggued: el.isLoggued === 1 ? true : false,
            interet: el.interet,
            biographie: el.biographie,
            attirance: {
                male: el.attiranceMale === 1 ? true : false,
                female: el.attiranceFemale === 1 ? true : false
            },
            myGender: el.myGender,
            birthday: {
                day: el.birthday,
                month: el.birthmonth,
                year: el.birthyear
            },
            country: {
                name: el.city,
                lng: el.lng,
                lat: el.lat
            },
            lastname: el.lastname,
            firstname: el.firstname,
            email: el.email,
            password: el.password,
            token: el.token,
            isValid: el.isValid === 1 ? true : false,
            isNotif: el.isNotif === 1 ? true : false,
            isMessage: el.isMessage === 1 ? true : false,
            pictures: {
                _1: el.pic0,
                _2: el.pic1,
                _3: el.pic2,
                _4: el.pic3,
                _5: el.pic4
            },
            lastVisite: el.lastVisite,
            createdAt: el.createdAt
        }
        res.json({
            member: member
        });
    })
};

exports.changeMemberPass = function (req, res) {
    connection.query('UPDATE members SET password = ? WHERE pseudo = ?', [req.body.password, req.params.pseudo], (error, results, fields) => {
        if (error) throw error;
    });
    connection.query('SELECT * FROM members WHERE pseudo = ?', [req.params.pseudo], async (error, results, fields) => {
        if (error) throw error;
        let el = results[0]
        let member = {
            pseudo: el.pseudo,
            popularity: el.popularity,
            isLoggued: el.isLoggued === 1 ? true : false,
            interet: el.interet,
            biographie: el.biographie,
            attirance: {
                male: el.attiranceMale === 1 ? true : false,
                female: el.attiranceFemale === 1 ? true : false
            },
            myGender: el.myGender,
            birthday: {
                day: el.birthday,
                month: el.birthmonth,
                year: el.birthyear
            },
            country: {
                name: el.city,
                lng: el.lng,
                lat: el.lat
            },
            lastname: el.lastname,
            firstname: el.firstname,
            email: el.email,
            password: el.password,
            token: el.token,
            isValid: el.isValid === 1 ? true : false,
            isNotif: el.isNotif === 1 ? true : false,
            isMessage: el.isMessage === 1 ? true : false,
            pictures: {
                _1: el.pic0,
                _2: el.pic1,
                _3: el.pic2,
                _4: el.pic3,
                _5: el.pic4
            },
            lastVisite: el.lastVisite,
            createdAt: el.createdAt
        }
        res.json({
            member: member
        });
    })
};

exports.changeMemberCountry = function (req, res) {
    connection.query('UPDATE members SET city = ?, lat = ?, lng = ? WHERE pseudo = ?', [req.body.country.name, req.body.country.lat, req.body.country.lng, req.params.pseudo], (error, results, fields) => {
        if (error) throw error;
    });
    connection.query('SELECT * FROM members WHERE pseudo = ?', [req.params.pseudo], async (error, results, fields) => {
        if (error) throw error;
        let el = results[0]
        let member = {
            pseudo: el.pseudo,
            popularity: el.popularity,
            isLoggued: el.isLoggued === 1 ? true : false,
            interet: el.interet,
            biographie: el.biographie,
            attirance: {
                male: el.attiranceMale === 1 ? true : false,
                female: el.attiranceFemale === 1 ? true : false
            },
            myGender: el.myGender,
            birthday: {
                day: el.birthday,
                month: el.birthmonth,
                year: el.birthyear
            },
            country: {
                name: el.city,
                lng: el.lng,
                lat: el.lat
            },
            lastname: el.lastname,
            firstname: el.firstname,
            email: el.email,
            password: el.password,
            token: el.token,
            isValid: el.isValid === 1 ? true : false,
            isNotif: el.isNotif === 1 ? true : false,
            isMessage: el.isMessage === 1 ? true : false,
            pictures: {
                _1: el.pic0,
                _2: el.pic1,
                _3: el.pic2,
                _4: el.pic3,
                _5: el.pic4
            },
            lastVisite: el.lastVisite,
            createdAt: el.createdAt
        }
        res.json({
            member: member
        });
    })
};

exports.changeMemberPictures = function (req, res) {
    if (req.file === undefined)
        res.send({error: false});
    else {        
        sharp(req.file.path)
        .resize(954, 635)
        .toBuffer((err, buffer) => {
            fs.writeFile(req.file.path, buffer, function(e) { 
            });
        })

        if (req.params.id === '_1') {
            connection.query('UPDATE members SET pic0 = ? WHERE pseudo = ?', [req.file.filename, req.params.pseudo], (error, results, fields) => {
                if (error) throw error;
            });
        }
        if (req.params.id === '_2') {
            connection.query('UPDATE members SET pic1 = ? WHERE pseudo = ?', [req.file.filename, req.params.pseudo], (error, results, fields) => {
                if (error) throw error;
            });
        }
        if (req.params.id === '_3') {
            connection.query('UPDATE members SET pic2 = ? WHERE pseudo = ?', [req.file.filename, req.params.pseudo], (error, results, fields) => {
                if (error) throw error;
            });
        }
        if (req.params.id === '_4') {
            connection.query('UPDATE members SET pic3 = ? WHERE pseudo = ?', [req.file.filename, req.params.pseudo], (error, results, fields) => {
                if (error) throw error;
            });
        }
        if (req.params.id === '_5') {
            connection.query('UPDATE members SET pic4 = ? WHERE pseudo = ?', [req.file.filename, req.params.pseudo], (error, results, fields) => {
                if (error) throw error;
            });
        }
        connection.query('SELECT * FROM members WHERE pseudo = ?', [req.params.pseudo], async (error, results, fields) => {
            if (error) throw error;
            let el = results[0]
            let member = {
                pseudo: el.pseudo,
                popularity: el.popularity,
                isLoggued: el.isLoggued === 1 ? true : false,
                interet: el.interet,
                biographie: el.biographie,
                attirance: {
                    male: el.attiranceMale === 1 ? true : false,
                    female: el.attiranceFemale === 1 ? true : false
                },
                myGender: el.myGender,
                birthday: {
                    day: el.birthday,
                    month: el.birthmonth,
                    year: el.birthyear
                },
                country: {
                    name: el.city,
                    lng: el.lng,
                    lat: el.lat
                },
                lastname: el.lastname,
                firstname: el.firstname,
                email: el.email,
                password: el.password,
                token: el.token,
                isValid: el.isValid === 1 ? true : false,
                isNotif: el.isNotif === 1 ? true : false,
                isMessage: el.isMessage === 1 ? true : false,
                pictures: {
                    _1: el.pic0,
                    _2: el.pic1,
                    _3: el.pic2,
                    _4: el.pic3,
                    _5: el.pic4
                },
                lastVisite: el.lastVisite,
                createdAt: el.createdAt
            }
            res.json({
                member: member
            });
        })
    }
};

exports.isProfilePicture = function (req, res) {
    connection.query('SELECT * FROM members WHERE pseudo = ?', [req.params.pseudo], async (error, results, fields) => {
        if (error) throw error;
        if (results === undefined) {
            res.json({
                status: false
            });
        }
        else {
            if (results[0].pic0 !== '') {
                res.json({
                    status: true,
                    pic: results[0].pic0
                });
            }
            else {
                res.json({
                    status: false   
                });
            }
        }
    });
};

exports.isPicture2 = function (req, res) {
    connection.query('SELECT * FROM members WHERE pseudo = ?', [req.params.pseudo], async (error, results, fields) => {
        if (error) throw error;
        if (results === undefined) {
            res.json({
                status: false
            });
        }
        else {
            if (results[0].pic1 !== '') {
                res.json({
                    status: true,
                    pic: results[0].pic1
                });
            }
            else {
                res.json({
                    status: false   
                });
            }
        }
    });
};

exports.isPicture3 = function (req, res) {
    connection.query('SELECT * FROM members WHERE pseudo = ?', [req.params.pseudo], async (error, results, fields) => {
        if (error) throw error;
        if (results === undefined) {
            res.json({
                status: false
            });
        }
        else {
            if (results[0].pic2 !== '') {
                res.json({
                    status: true,
                    pic: results[0].pic2
                });
            }
            else {
                res.json({
                    status: false   
                });
            }
        }
    });
};

exports.isPicture4 = function (req, res) {
    connection.query('SELECT * FROM members WHERE pseudo = ?', [req.params.pseudo], async (error, results, fields) => {
        if (error) throw error;
        if (results === undefined) {
            res.json({
                status: false
            });
        }
        else {
            if (results[0].pic3 !== '') {
                res.json({
                    status: true,
                    pic: results[0].pic3
                });
            }
            else {
                res.json({
                    status: false   
                });
            }
        }
    });
};

exports.isPicture5 = function (req, res) {
    connection.query('SELECT * FROM members WHERE pseudo = ?', [req.params.pseudo], async (error, results, fields) => {
        if (error) throw error;
        if (results === undefined) {
            res.json({
                status: false
            });
        }
        else {
            if (results[0].pic4 !== '') {
                res.json({
                    status: true,
                    pic: results[0].pic4
                });
            }
            else {
                res.json({
                    status: false   
                });
            }
        }
    });
};

exports.getNotif = function (req, res) {
    connection.query('SELECT * FROM members WHERE pseudo = ?', [req.params.pseudo], async (error, results, fields) => {
        if (error) throw error;
        if (results === undefined) {
            res.json({
                status: false
            });
        }
        else {
            res.json({
                notif: results[0].isNotif === true ? 1 : 0
            });
        }
    });
};

exports.getNotifMsg = function (req, res) {
    connection.query('SELECT * FROM members WHERE pseudo = ?', [req.params.pseudo], async (error, results, fields) => {
        if (error) throw error;
        if (results === undefined) {
            res.json({
                status: false
            });
        }
        else {
            res.json({
                notif: results[0].isMessage === true ? 1 : 0
            });
        }
    });
};

exports.postNotif = function (req, res) {
    connection.query('UPDATE members SET isNotif = ? WHERE pseudo = ?', [req.params.status ? 1 : 0, req.params.pseudo], (error, results, fields) => {
        if (error) throw error;
    });
    connection.query('SELECT * FROM members WHERE pseudo = ?', [req.params.pseudo], async (error, results, fields) => {
        if (error) throw error;
        let el = results[0]
        let member = {
            pseudo: el.pseudo,
            popularity: el.popularity,
            isLoggued: el.isLoggued === 1 ? true : false,
            interet: el.interet,
            biographie: el.biographie,
            attirance: {
                male: el.attiranceMale === 1 ? true : false,
                female: el.attiranceFemale === 1 ? true : false
            },
            myGender: el.myGender,
            birthday: {
                day: el.birthday,
                month: el.birthmonth,
                year: el.birthyear
            },
            country: {
                name: el.city,
                lng: el.lng,
                lat: el.lat
            },
            lastname: el.lastname,
            firstname: el.firstname,
            email: el.email,
            password: el.password,
            token: el.token,
            isValid: el.isValid === 1 ? true : false,
            isNotif: el.isNotif === 1 ? true : false,
            isMessage: el.isMessage === 1 ? true : false,
            pictures: {
                _1: el.pic0,
                _2: el.pic1,
                _3: el.pic2,
                _4: el.pic3,
                _5: el.pic4
            },
            lastVisite: el.lastVisite,
            createdAt: el.createdAt
        }
        res.json({
            member: member
        });
    })
};

exports.postNotifMsg = function (req, res) {
    connection.query('UPDATE members SET isMessage = ? WHERE pseudo = ?', [req.params.status ? 1 : 0, req.params.pseudo], (error, results, fields) => {
        if (error) throw error;
    });
    connection.query('SELECT * FROM members WHERE pseudo = ?', [req.params.pseudo], async (error, results, fields) => {
        if (error) throw error;
        let el = results[0]
        let member = {
            pseudo: el.pseudo,
            popularity: el.popularity,
            isLoggued: el.isLoggued === 1 ? true : false,
            interet: el.interet,
            biographie: el.biographie,
            attirance: {
                male: el.attiranceMale === 1 ? true : false,
                female: el.attiranceFemale === 1 ? true : false
            },
            myGender: el.myGender,
            birthday: {
                day: el.birthday,
                month: el.birthmonth,
                year: el.birthyear
            },
            country: {
                name: el.city,
                lng: el.lng,
                lat: el.lat
            },
            lastname: el.lastname,
            firstname: el.firstname,
            email: el.email,
            password: el.password,
            token: el.token,
            isValid: el.isValid === 1 ? true : false,
            isNotif: el.isNotif === 1 ? true : false,
            isMessage: el.isMessage === 1 ? true : false,
            pictures: {
                _1: el.pic0,
                _2: el.pic1,
                _3: el.pic2,
                _4: el.pic3,
                _5: el.pic4
            },
            lastVisite: el.lastVisite,
            createdAt: el.createdAt
        }
        res.json({
            member: member
        });
    })
};

exports.disconnectMember = function (req, res) {
    connection.query('UPDATE members SET lastVisite = ? WHERE pseudo = ?', [Date.now(), req.params.pseudo], (error, results, fields) => {
        if (error) throw error;
    });
    connection.query('SELECT * FROM members WHERE pseudo = ?', [req.params.pseudo], async (error, results, fields) => {
        if (error) throw error;
        let el = results[0]
        let member = {
            pseudo: el.pseudo,
            popularity: el.popularity,
            isLoggued: el.isLoggued === 1 ? true : false,
            interet: el.interet,
            biographie: el.biographie,
            attirance: {
                male: el.attiranceMale === 1 ? true : false,
                female: el.attiranceFemale === 1 ? true : false
            },
            myGender: el.myGender,
            birthday: {
                day: el.birthday,
                month: el.birthmonth,
                year: el.birthyear
            },
            country: {
                name: el.city,
                lng: el.lng,
                lat: el.lat
            },
            lastname: el.lastname,
            firstname: el.firstname,
            email: el.email,
            password: el.password,
            token: el.token,
            isValid: el.isValid === 1 ? true : false,
            isNotif: el.isNotif === 1 ? true : false,
            isMessage: el.isMessage === 1 ? true : false,
            pictures: {
                _1: el.pic0,
                _2: el.pic1,
                _3: el.pic2,
                _4: el.pic3,
                _5: el.pic4
            },
            lastVisite: el.lastVisite,
            createdAt: el.createdAt
        }
        res.json({
            member: member
        });
    })
    
};

exports.getLastConnect = function (req, res) {
    connection.query('SELECT * FROM members WHERE pseudo = ?', [req.params.pseudo], async (error, results, fields) => {
        if (error) throw error;
        let el = results[0]
        res.json({
            last: el.lastVisite
        });
    })
};