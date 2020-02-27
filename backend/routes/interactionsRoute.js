let router = require('express').Router();

var interactionsController = require('../controllers/interactionsController');

router.route('/api/interactions')
    .post(interactionsController.newInteraction)

router.route('/api/interactions/remove')
    .post(interactionsController.removeInteraction)

router.route('/api/interactions/like/count/:pseudo')
    .get(interactionsController.countLike)

router.route('/api/interactions/like/ismatch/:pseudo1/:pseudo2')
    .get(interactionsController.isMatch)

router.route('/api/interactions/block/isblock/:pseudo1/:pseudo2')
    .get(interactionsController.isBlock)

router.route('/api/interactions/block/getblock/:pseudo')
    .get(interactionsController.getBlock)

router.route('/api/interactions/block/getblockme/:pseudo')
    .get(interactionsController.getBlockMe)

router.route('/api/interactions/last/:pseudo')
    .get(interactionsController.getLastNotifications)

router.route('/api/interactions/lastView/:pseudo')
    .get(interactionsController.getLastView)

router.route('/api/interactions/lastLike/:pseudo')
    .get(interactionsController.getLastLike)

router.route('/api/interactions/report/:pseudo')
    .get(interactionsController.report)
module.exports = router;