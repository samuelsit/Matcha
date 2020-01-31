// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/api', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to matchaback !',
    });
});
// Import contact controller
var memberController = require('../controllers/membersController');
// Contact routes
router.route('/api/members')
    .get(memberController.index)
    .post(memberController.new);
router.route('/api/members/:member_id')
    .get(memberController.view)
    .patch(memberController.update)
    .put(memberController.update)
    .delete(memberController.delete);
// Export API routes
module.exports = router;