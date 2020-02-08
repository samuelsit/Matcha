let router = require('express').Router();

var interactionsController = require('../controllers/interactionsController');

router.route('/api/interactions')
    .post(interactionsController.newInteraction)

router.route('/api/interactions/like/count/:pseudo')
    .get(interactionsController.countLike)

router.route('/api/interactions/like/ismatch/:pseudo1/:pseudo2')
    .get(interactionsController.isMatch)

router.route('/api/interactions/last/:pseudo')
    .get(interactionsController.getLastNotifications)

module.exports = router;