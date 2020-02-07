let router = require('express').Router();

var interactionsController = require('../controllers/interactionsController');

router.route('/api/interactions')
    .post(interactionsController.newInteraction)

router.route('/api/interactions/like/count/:email')
    .get(interactionsController.countLike)

router.route('/api/interactions/like/ismatch/:email1/:email2')
    .get(interactionsController.isMatch)

router.route('/api/interactions/last/:email')
    .get(interactionsController.getLastNotifications)

module.exports = router;