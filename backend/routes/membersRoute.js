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
        cb(null, email + pictureId + '.png')
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

let upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

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
router.route('/api/members/all/:email')
    .get(memberController.allMember)

router.route('/api/members')
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

router.route('/api/members/pictures/profile/:email')
    .get(memberController.isProfilePicture);

// Export API routes
module.exports = router;


/////
//.put(memberController.update)
//.delete(memberController.delete);