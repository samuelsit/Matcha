let router = require('express').Router();

var messagesController = require('../controllers/messagesController');

router.route('/api/messages')
    .post(messagesController.newMessage)

router.route('/api/messages/all/:pseudo1/:pseudo2')
    .get(messagesController.getMessagesWith)

router.route('/api/messages/last/:pseudo')
    .get(messagesController.getLastMessages)

module.exports = router;