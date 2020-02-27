Member = require('./models/membersModel');
bcrypt = require('bcrypt')
var faker = require('faker');
faker.locale = "fr";

exports.seedMember = function (req, res) {
    var randomCard = faker.helpers.createCard();
    var member = new Member();
    var Birth = new Date(faker.date.past(20, new Date(2000, 0, 1)));
    // faker.seed(parseInt(req.body.seed, 10));
    member.popularity = 0;
    member.isLoggued = req.body.seed % 5 === 0 ? true : false;
    member.interet = '#' + faker.random.word().replace(/ /g, ', #');
    member.attirance.male = req.body.seed % 2 === 0 ? true : false;
    member.attirance.female = req.body.seed % 1 === 0 ? true : false;
    member.myGender = req.body.seed % 3 === 0 ? 'female' : 'male';
    member.birthday.year = Birth.getFullYear();
    member.birthday.month = Birth.getMonth() + 1;
    member.birthday.day = Birth.getDay() + 1;        
    member.country.name = faker.address.state();
    member.country.lat = faker.address.latitude();
    member.country.lng = faker.address.longitude();
    member.lastname = faker.name.lastName()
    member.firstname = faker.name.firstName()
    member.email = randomCard.email;
    member.password = bcrypt.hashSync('Samuel3010', bcrypt.genSaltSync(10));
    member.token = require('crypto').randomBytes(32).toString('hex');
    member.isValid = true;
    member.biographie = randomCard.posts[0].sentences;
    member.pictures._1 = faker.image.avatar();
    member.pictures._2 = faker.image.avatar();
    member.pictures._3 = faker.image.avatar();
    member.pictures._4 = faker.image.avatar();
    member.pictures._5 = faker.image.avatar();
    member.pseudo = randomCard.username;
    member.isNotif = false;
    member.isMessage = false;
    member.lastVisite = Date.now();
    member.save(function (err) {            
        if (err)
            res.json(err);
        res.json({
            member
        });
    });
}