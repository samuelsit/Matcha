let router = require('express').Router();

var messagesController = require('../controllers/messagesController');

router.route('/api/messages')
    .post(messagesController.newMessage)

router.route('/api/messages/all/:email1/:email2')
    .get(messagesController.getMessagesWith)

router.route('/api/messages/last/:email')
    .get(messagesController.getLastMessages)

module.exports = router;