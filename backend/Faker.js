bcrypt = require('bcrypt')
var faker = require('faker');
faker.locale = "fr";
var connection = require('./bdd')

exports.seedMember = function (req, res) {
    var randomCard = faker.helpers.createCard();
    var Birth = new Date(faker.date.past(20, new Date(2000, 0, 1)));
    // faker.seed(parseInt(req.body.seed, 10));
    connection.query('INSERT members SET pseudo = ?, lastname = ?, firstname = ?, email = ?, password = ?, createdAt = ?, myGender = ?, attiranceMale = ?, attiranceFemale = ?, biographie = ?, interet = ?, birthday = ?, birthmonth = ?, birthyear = ?, pic0 = ?, pic1 = ?, pic2 = ?, pic3 = ?, pic4 = ?, city = ?, lat = ?, lng = ?, lastVisite = ?, popularity = ?, isLoggued = ?, isValid = ?, isNotif = ?, isMessage = ?, token = ?', [randomCard.username, faker.name.lastName(), faker.name.firstName(), randomCard.email, bcrypt.hashSync('Samuel3010', bcrypt.genSaltSync(10)), new Date(), req.body.seed % 3 === 0 ? 'female' : 'male', req.body.seed % 2 === 0 ? true : false, req.body.seed % 1 === 0 ? true : false, randomCard.posts[0].sentences, '#' + faker.random.word().replace(/ /g, ', #'), Birth.getDay() + 1, Birth.getMonth() + 1, Birth.getFullYear(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.address.state(), faker.address.latitude(), faker.address.longitude(), new Date(), 0, req.body.seed % 5 === 0 ? true : false, true, false, false, require('crypto').randomBytes(32).toString('hex')], (err) => {
        if (err) console.log(err)
    })
}