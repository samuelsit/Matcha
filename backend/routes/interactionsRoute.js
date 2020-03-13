let router = require('express').Router();

var interactionsController = require('../controllers/interactionsController');
const CheckToken = require('../middlewares/checkToken'); 

router.route('/api/interactions')
    .post(CheckToken, interactionsController.newInteraction)

router.route('/api/interactions/remove')
    .post(CheckToken, interactionsController.removeInteraction)

router.route('/api/interactions/like/count/:pseudo')
    .get(CheckToken, interactionsController.countLike)

router.route('/api/interactions/like/ismatch/:pseudo1/:pseudo2')
    .get(CheckToken, interactionsController.isMatch)

router.route('/api/interactions/block/isblock/:pseudo1/:pseudo2')
    .get(CheckToken, interactionsController.isBlock)

router.route('/api/interactions/block/getblock/:pseudo')
    .get(CheckToken,interactionsController.getBlock)

router.route('/api/interactions/block/getblockme/:pseudo')
    .get(CheckToken, interactionsController.getBlockMe)

router.route('/api/interactions/last/:pseudo')
    .get(CheckToken, interactionsController.getLastNotifications)

router.route('/api/interactions/lastView/:pseudo')
    .get(CheckToken, interactionsController.getLastView)

router.route('/api/interactions/lastLike/:pseudo')
    .get(CheckToken, interactionsController.getLastLike)

router.route('/api/interactions/report/:pseudo')
    .get(CheckToken, interactionsController.report)
module.exports = router;