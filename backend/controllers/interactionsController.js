var connection = require('../bdd')
const nodemailer = require("nodemailer");

// Handle create messages actions and send mail
exports.newInteraction = function (req, res) {
    connection.query('INSERT INTO interactions SET interFrom = ?, interTo = ?, data = ?, createdAt = ?', [req.body.from, req.body.to, req.body.data, Date.now()], (err) => {
        if (err) throw err;
        res.json({
            interaction: {
                from: req.body.from,
                to: req.body.to,
                data: req.body.data
            }
        });
    })
};

exports.report = function (req, res) {
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
    connection.query('DELETE FROM interactions WHERE interFrom = ? AND interTo = ? AND data = ?', [req.body.from, req.body.to, req.body.data], (err) => {
        if (err) throw err;
        else
            res.json({
                status: "success",
                message: 'Like deleted'
            });
    })
};

exports.countLike = function (req, res) {
    connection.query('SELECT COUNT(*) AS count FROM interactions WHERE interTo = ? AND data = ?', [req.params.pseudo, 'like'], (error, results, fields) => {
        if (error) throw error;
        else
            res.json({
                interactions: results[0].count
            });
    })
};

exports.isMatch = function (req, res) {
    connection.query('SELECT COUNT(*) AS count FROM interactions WHERE interTo = ? AND interFrom = ? AND data = ?', [req.params.pseudo2, req.params.pseudo1, 'like'], (error, results, fields) => {
        if (error) throw error;
        else
            res.json({
                interactions: results[0].count
            });
    })
};

exports.isBlock = function (req, res) {
    connection.query('SELECT COUNT(*) AS count FROM interactions WHERE interTo = ? AND interFrom = ? AND data = ?', [req.params.pseudo2, req.params.pseudo1, 'block'], (error, results, fields) => {
        if (error) throw error;
        else
            res.json({
                interactions: results[0].count
            });
    })
};

exports.getLastNotifications = function (req, res) {
    connection.query('SELECT * FROM interactions WHERE interTo = ?', [req.params.pseudo], (error, results, fields) => {
        if (error) throw error;
        else {
            let interactions = results.sort((a, b) => b.createdAt - a.createdAt).map(el => ({from: el.interFrom, to: el.interTo, data: el.data}))
            res.json({
                interactions: interactions
            });
        }
    })
};

exports.getBlock = function (req, res) {
    connection.query('SELECT * FROM interactions WHERE interFrom = ? AND data = ?', [req.params.pseudo, 'block'], (error, results, fields) => {
        if (error) throw error;
        else {
            let block = results.map(el => el.interTo)
            res.json({
                block: block
            });
        }
    })
};

exports.getBlockMe = function (req, res) {
    connection.query('SELECT * FROM interactions WHERE interTo = ? AND data = ?', [req.params.pseudo, 'block'], (error, results, fields) => {
        if (error) throw error;
        else {
            let block = results.map(el => el.interFrom)
            res.json({
                block: block
            });
        }
    })
};

exports.getLastView = function (req, res) {
    connection.query('SELECT * FROM interactions WHERE interFrom = ? AND data = ?', [req.params.pseudo, 'view'], (error, results, fields) => {
        if (error) throw error;
        else {
            let interactions = results.sort((a, b) => b.createdAt - a.createdAt).map(el => ({from: el.interFrom, to: el.interTo, data: el.data}))
            res.json({
                interactions: interactions
            });
        }
    })
};

exports.getLastLike = function (req, res) {
    connection.query('SELECT * FROM interactions WHERE interFrom = ? AND data = ?', [req.params.pseudo, 'like'], (error, results, fields) => {
        if (error) throw error;
        else {
            let interactions = results.sort((a, b) => b.createdAt - a.createdAt).map(el => ({from: el.interFrom, to: el.interTo, data: el.data}))
            res.json({
                interactions: interactions
            });
        }
    })
};