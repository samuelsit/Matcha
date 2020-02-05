// Initialize express router
let router = require('express').Router();
let multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../frontend/src/pictures/profile/')
    },
    filename: function(req, file, cb) {
        const url = req.url.split('/')
        const urlLength = url.length
        const email = url[urlLength - 2]
        const pictureId = url[urlLength - 1]
        const fileName = file.originalname.split('.')
        const fileLength = fileName.length
        const ext = fileName[fileLength - 1]        
        cb(null, email + pictureId + '.' + ext)
    }
})

let upload = multer({storage: storage})

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

// Change member profile
router.route('/api/members/pictures/:email/:id')
    .post(upload.single('image'), memberController.changeMemberPictures);

// Export API routes
module.exports = router;


/////
//.put(memberController.update)
//.delete(memberController.delete);