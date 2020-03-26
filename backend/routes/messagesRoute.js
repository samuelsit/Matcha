let router = require('express').Router();

var messagesController = require('../controllers/messagesController');
const CheckToken = require('../middlewares/checkToken')

router.route('/api/messages')
    .post(messagesController.newMessage)

router.route('/api/messages/all/:pseudo1/:pseudo2')
    .get(messagesController.getMessagesWith)

router.route('/api/messages/last/:pseudo')
    .get(CheckToken, messagesController.getLastMessages)

router.route('/api/messages/exist/:pseudo1/:pseudo2')
    .get(messagesController.isMessage)

module.exports = router;