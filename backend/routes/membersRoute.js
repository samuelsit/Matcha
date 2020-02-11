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
        const pseudo = url[urlLength - 2]
        const pictureId = url[urlLength - 1]      
        cb(null, pseudo + pictureId + '.png')
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
var Faker = require('../Faker');
///////////////////////////////////////////////////////////////////////////////
//
//SEED MEMBERS
router.route('/api/members/seed')
    .post(Faker.seedMember)

// Get all members // Create new member //
router.route('/api/members/all/:pseudo')
    .post(memberController.allMember)

router.route('/api/members')
    .post(memberController.newMember);

// Get member
router.route('/api/members/:pseudo')
    .get(memberController.oneMember)

// Change member status //
router.route('/api/members/status/:status/:pseudo')
    .patch(memberController.changeStatus);

// Check if member exist
router.route('/api/members/exist/:pseudo')
    .get(memberController.isMember);

router.route('/api/members/exist/email/:email')
    .get(memberController.isMemberMail);

// Check if is valid token
router.route('/api/members/token/:pseudo/:token')
    .get(memberController.isValidToken);

// Change token
router.route('/api/members/token/:pseudo/:token')
    .patch(memberController.changeToken);

// Check if is valid member
router.route('/api/members/isValid/:pseudo')
    .get(memberController.isValidMember);

router.route('/api/members/isCountry/:pseudo')
    .get(memberController.isCountry);

// Change isValid
router.route('/api/members/isValid/:pseudo/:status')
    .patch(memberController.changeIsValid);

// Change member profile
router.route('/api/members/profile/:pseudo')
    .patch(memberController.changeMemberProfile);

router.route('/api/members/profile/pass/:pseudo')
    .patch(memberController.changeMemberPass);

router.route('/api/members/profile/country/:pseudo')
    .patch(memberController.changeMemberCountry);

// Change member profile
router.route('/api/members/pictures/:pseudo/:id')
    .post(upload.single('image'), memberController.changeMemberPictures);

router.route('/api/members/pictures/profile/:pseudo')
    .get(memberController.isProfilePicture);

router.route('/api/members/pictures/2/:pseudo')
    .get(memberController.isPicture2);

router.route('/api/members/pictures/3/:pseudo')
    .get(memberController.isPicture3);

router.route('/api/members/pictures/4/:pseudo')
    .get(memberController.isPicture4);

router.route('/api/members/pictures/5/:pseudo')
    .get(memberController.isPicture5);

router.route('/api/members/forget/:email')
    .get(memberController.forgetPass);

// Export API routes
module.exports = router;


/////
//.put(memberController.update)
//.delete(memberController.delete);