const catchAsync = require('./../util/catchAsync');
const crypto = require('crypto');
const email = require('./../util/mailer');
const { promisify } = require('util');
const apierror = require('./../util/global-error');
const jwt = require('jsonwebtoken');
const Candidates = require('./../modle/candidate-modle');
exports.activateAccount = catchAsync(async (req, res, next) => {
  let token = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  let user = await Candidates.findOne({
    passwordToken: token,
    tokenExpire: { $gte: Date.now() },
  });
  if (!user) return new next(new apierror('token expired', 400));
  user.active = true;
  user.passwordToken = undefined;
  user.tokenExpire = undefined;
  await user.save({ validateBeforeSave: true });
  next();
});
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new apierror('invalid inputs given', 400));

  user = await Candidates.findOne({
    email: req.body.email,
    active: true,
  }).select('+password');
  if (!user)
    return next(new apierror('the password or email is incorrect', 400));

  if (!(await user.correctPassword(req.body.password, user.password)))
    return next(new apierror('the password or email is incorrect', 400));

  let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TIME,
  });
  res.cookie('jwt', token, {
    expires: new Date(Date.now + process.env.COOKIE_EXP * 60 * 24 * 60 * 1000),
    secure: false,
    httpOnly: true,
  });

  res.status(200).json({ status: 'success', token });
});
exports.isProtected = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    if (req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
  }
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) return next(new apierror('not logged in', 401));
  const data = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  let user = await Candidates.findById(data._id);
  
  // console.log(user,"isProtected");
  if (!user)
    return next(new apierror('user was deleated please login again', 401));
  if (await user.changepassword(data.iat))
    return next(new apierror('password was changed please login again', 401));
  req.user = user;
  next();
});
exports.restrictTo = (options) => {
  return (req, res, next) => {
    if (!options.includes(req.user.role))
      return next(
        new apierror('You are not allowed to access this route', 400)
      );
    next();
  };
};
exports.forgetPassword = catchAsync(async (req, res, next) => {
  let email_ = req.body.email;

  let user = await Candidates.findOne({ email: email_ });
  if (!user) return next(new apierror('No such user exist', 400));
  token = await user.setToken();
  await user.save({ validateBeforeSave: false });
  const URL = `${req.protocol}://${req.get('host')}/EC/resetpassword/${token}`;
  // `${req.protocol}://${req.get(
  //   'host'
  // )}/api/v1/candidate/resetpassword/${token}`;
  const message = `to change password click here ${URL}`;
  try {
    await new email(user, URL).forgotmail();
    res.status(200).json({ status: 'success', message: 'reset token send' });
  } catch (err) {
    user.passwordToken = undefined;
    user.tokenExpire = undefined;
    await user.save({ validateBeforeSave: false });
    next(new apierror('failed to send mail', 500));
  }
});
exports.resetPassword = catchAsync(async (req, res, next) => {
  let token = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  let user = await Candidates.findOne({
    passwordToken: token,
    tokenExpire: { $gte: Date.now() },
  });
  //   console.log(user, token);
  if (!user) return new next(new apierror('token expired', 400));
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordToken = undefined;
  user.tokenExpire = undefined;
  user.passwordChangedAt = Date.now();
  await user.save();
  token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TIME,
  });
  res.cookie('jwt', token, {
    expires: new Date(Date.now + process.env.COOKIE_EXP * 60 * 24 * 60 * 1000),
    secure: false,
    httpOnly: true,
  });
  res.status(201).json({
    status: 'success',
    token,
    data: { user },
  });
});
exports.signup = catchAsync(async (req, res, next) => {
  if (req.body.active) req.body.active = false;
  if(req.body.role=="candidate")//req.body.post.match(/secretary/i) || req.body.post.match(/BS_Y[1,2][8,9,0]/i))
  return next(new apierror("registration closed for candidate"),400);
  if(req.body.role=="admin")
  return next(new apierror("not allowed to access this route"),400);
  let user = await Candidates.findOne({ email: req.body.email });
  if (user) {
    if (user.active == true)
      return next(new apierror('the user already exist', 400));
    else await Candidates.findByIdAndDelete(user._id);
  }
  user = await Candidates.create(req.body);
  token = await user.setToken();
  await user.save({ validateBeforeSave: false });
  const URL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/candidate/activate/${token}`;
  try {
    await new email(user, URL).welcomemail();
    res.status(200).json({ status: 'success', message: 'reset token send' });
  } catch (err) {
    
    user.passwordToken = undefined;
    user.tokenExpire = undefined;
    console.log(err);
    await Candidates.deleteOne({ _id: user._id });
    return next(new apierror('failed to send mail', 500));
  }
});

exports.logout = catchAsync((req, res, next) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
});

exports.islogin = catchAsync(async (req, res, next) => {
 
  if (req.cookies.jwt) {
    try {
      let decoded;
      // console.log("Hi1");
      try {
        // 1) verify token
         decoded = await await promisify(jwt.verify)(
          req.cookies.jwt,
          process.env.JWT_SECRET
        );
        // console.log(decoded);
      } catch (err) {
        //console.log(err);
        res.locals.user = null;
        return next();
      }
      // 2) Check if user still exists
      const currentUser = await Candidates.findById(decoded._id);
      // console.log(currentUser);
      // console.log(decoded.iat);
      if (!currentUser) {
        // console.log("Hi2");
        res.locals.user = null;
        return next();
      }

      //3) Check if user changed password after the token was issued
      
      if (await currentUser.changepassword(decoded.iat)) {
        // console.log("Hi3");
        res.locals.user = null;
        return next();
      }

      // THERE IS A LOGGED IN USER
      // console.log(currentUser,"islogin");
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      // console.log("hi4");
      //console.log(err.message);
      return next();
    }
  } else {
    res.locals.user = null;
    return next()};
});
exports.islogin_=catchAsync(async (req, res,next)=>{
  res.locals.user=null;
  next();
});
exports.giveconsent=catchAsync(async(req,res,next)=>{
 let user=req.user;
 if(!user.consent){
   user.consent=true;
   await user.save({validateBeforeSave: false});
 }
 res.status(200).json({status: 'success'});
});