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
    viewcontroller.somedata,
    authcontroller.islogin,
    viewcontroller.getLoginPage
  );
router.get('/EC/Verify', viewcontroller.getVerification);
router.get('/EC/resetpassword/:token', viewcontroller.resetPassword);
router
  .route('/EC/person/:id')
  .get(authcontroller.islogin, viewcontroller.person);
router.get(
  '/EC/Myteam/:id',
  authcontroller.islogin,
  viewcontroller.getteam,
  viewcontroller.team
);
router.get(
  '/EC/nomination/:id',
  authcontroller.islogin,
  viewcontroller.nominationfilling
);
router.get(
  '/EC/post/:post',
  authcontroller.islogin,
  viewcontroller.specificpost,
  viewcontroller.post
);
router.get('/EC/posts', authcontroller.islogin, viewcontroller.posts);
module.exports = router;
