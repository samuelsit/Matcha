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

///////////////////////////////////////////////////////////////////////////////
//
// Get all members // Create new member //
router.route('/api/members')
    .get(memberController.index)
    .post(memberController.new);

// Get member
router.route('/api/members/:email')
    .get(memberController.view)

// Change member status //
router.route('/api/members/:status/:email')
    .patch(memberController.update);

router.route('/api/members/exist/:email')
    .get(memberController.find);

// Export API routes
module.exports = router;


/////
//.put(memberController.update)
//.delete(memberController.delete);