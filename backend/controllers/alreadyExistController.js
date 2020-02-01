Member = require('../models/membersModel');

exports.find = function (req, res) {
    Member.findOne({email: req.params.email}, function (err, members) {
        if (err) {
            res.json({
                status: "error",
                message: err,
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