// Initialize express router
let router = require('express').Router();
// Import contact controller
var alreadyExistController = require('../controllers/alreadyExistController');

router.route('/api/members/exist/:email')
    .get(alreadyExistController.find);
// Export API routes
module.exports = router;