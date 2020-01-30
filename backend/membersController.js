Member = require('./membersModel');
// Handle index actions
exports.index = function (req, res) {
    Member.get(function (err, members) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            members
        });
    });
};
// Handle create members actions
exports.new = function (req, res) {
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
    member.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            member
        });
    });
};
// Handle view member info
exports.view = function (req, res) {
    Member.findById(req.params.member_id, function (err, member) {
        if (err)
            res.send(err);
        res.json({
            member
        });
    });
};
// Handle update member info
exports.update = function (req, res) {
    Member.findById(req.params.member_id, function (err, member) {
        if (err)
            res.send(err);
        member.name = req.body.name ? req.body.name : member.name;
        member.gender = req.body.gender;
        member.email = req.body.email;
        member.phone = req.body.phone;
        member.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                member
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    Member.remove({
        _id: req.params.member_id
    }, function (err, member) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};