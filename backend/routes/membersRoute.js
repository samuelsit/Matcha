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
    .get(memberController.allMember)
    .post(memberController.newMember);

// Get member
router.route('/api/members/:email')
    .get(memberController.oneMember)

// Change member status //
router.route('/api/members/status/:status/:email')
    .patch(memberController.changeStatus);

// Check if member exist
router.route('/api/members/exist/:email')
    .get(memberController.isMember);

// Check if is valid token
router.route('/api/members/token/:email/:token')
    .get(memberController.isValidToken);

// Change token
router.route('/api/members/token/:email/:token')
    .patch(memberController.changeToken);

// Check if is valid member
router.route('/api/members/isValid/:email')
    .get(memberController.isValidMember);

// Change isValid
router.route('/api/members/isValid/:email/:status')
    .patch(memberController.changeIsValid);

// Change member profile
router.route('/api/members/profile/:email')
    .patch(memberController.changeMemberProfile);

// Export API routes
module.exports = router;


/////
//.put(memberController.update)
//.delete(memberController.delete);