var connection = require('../bdd')

// Handle create messages actions and send mail
exports.newMessage = function (req, res) {
    connection.query('INSERT INTO messages SET messaFrom = ?, messaTo = ?, data = ?, createdAt = ?', [req.body.from, req.body.to, req.body.data, new Date()], (err) => {
        if (err) throw err;
        res.json({
            message: {
                from: req.body.from,
                to: req.body.to,
                data: req.body.data
            }
        });
    })
};

exports.getMessagesWith = function (req, res) {    
    connection.query('SELECT * FROM messages WHERE (messaFrom = ? AND messaTo = ?) OR (messaFrom = ? AND messaTo = ?)', [req.params.pseudo1, req.params.pseudo2, req.params.pseudo2, req.params.pseudo1], (err, results) => {
        if (err) throw err;
        else {            
            let messages = results.sort((a, b) => b.createdAt - a.createdAt).map(el => ({from: el.messaFrom, to: el.messaTo, data: el.data}))
            res.json({
                messages: messages
            });
        }
    })
};

exports.isMessage = function (req, res) {    
    connection.query('SELECT COUNT(*) as count FROM messages WHERE (messaFrom = ? AND messaTo = ?) OR (messaFrom = ? AND messaTo = ?)', [req.params.pseudo1, req.params.pseudo2, req.params.pseudo2, req.params.pseudo1], (err, results) => {
        if (err) throw err;
        else {
            if (results[0].count >= 1) {
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
    })
};

exports.getLastMessages = function (req, res) {
    var messageUsers = []
    var lastMessages = []
    connection.query('SELECT * FROM messages WHERE messaFrom = ? OR messaTo = ?', [req.params.pseudo, req.params.pseudo], (err, results) => {
        if (err) throw err;
        else {
            let messages = results.sort((a, b) => b.createdAt - a.createdAt).map(el => ({from: el.messaFrom, to: el.messaTo, data: el.data}))
            var arr = []
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
        }
    })
};