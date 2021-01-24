const express = require('express');
const viewcontroller = require('./../controllers/view-controller');
const authcontroller = require('./../controllers/auth-controller');
const router = express.Router();
router
  .route('/EC/mainpage')
  .get(authcontroller.islogin, viewcontroller.getMainPage);
router
  .route('/EC/login')
  .get(
    authcontroller.islogin,
    viewcontroller.getLoginPage
  );
  router
  .route('/EC/signup')
  .get(
    authcontroller.islogin,
    viewcontroller.getsignupPage
  );
router.get('/EC/Verify',authcontroller.islogin_, viewcontroller.getVerification);
router.get('/EC/resetpassword/:token', authcontroller.islogin_,viewcontroller.resetPassword);
router
  .route('/EC/person/:id')
  .get(
    authcontroller.islogin,
    authcontroller.isProtected,
    viewcontroller.protectsaccess,
    viewcontroller.person
  );
router.get(
  '/EC/Myteam/:id',
  authcontroller.islogin,
  authcontroller.isProtected,
  authcontroller.restrictTo(['admin', 'candidate']),
  viewcontroller.protectsaccess,
  viewcontroller.getteam,
  viewcontroller.team
);
router.get(
  '/EC/nomination/:id',
  authcontroller.islogin,
  authcontroller.isProtected,
  authcontroller.restrictTo(['admin', 'candidate']),
  viewcontroller.protectsaccess,
  viewcontroller.nominationfilling
);
router.get(
  '/EC/post/:post',
  authcontroller.islogin,
  authcontroller.isProtected,
  authcontroller.restrictTo(['admin']),
  viewcontroller.specificpost,
  viewcontroller.post
);
router.get(
  '/EC/posts',
  authcontroller.islogin,
  authcontroller.isProtected,
  authcontroller.restrictTo(['admin']),
  viewcontroller.posts
);
module.exports = router;
