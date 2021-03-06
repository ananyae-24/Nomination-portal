const catchAsync = require('./../util/catchAsync');
const Candidate = require('./../modle/candidate-modle');
const apierror = require('./../util/global-error');
exports.getMainPage = (req, res, next) => {
  res.status(200).render('mainpage');
};
exports.somedata = catchAsync(async (req, res, next) => {
  let candidate = await Candidate.find({ role: 'candidate', active: true })
    .select('_id name')
    .sort('name');
  res.locals.allcandidates = candidate;
  next();
});
exports.getLoginPage = (req, res, next) => {
  res.status(200).render('login');
};
exports.getsignupPage = (req, res, next) => {
  res.status(200).render('signup');
};
exports.getVerification = (req, res, next) => {
  res.status(200).render('verification', {
    token: req.query.token,
  });
};
exports.resetPassword = (req, res, next) => {
  res.status(200).render('forget_password', { token: req.params.token });
};
exports.person = catchAsync(async (req, res, next) => {
  let person = await Candidate.findById(req.params.id);
  if (!person) next(new apierror('the person doesnot exist', 400));
  for (const property in person) {
    if (person[property] == undefined) delete person[property];
  }
  res.status(200).render('individualform',{person});
});
exports.getteam = catchAsync(async (req, res, next) => {
  let id = req.params.id;
  let pop = await Candidate.findById(id);
  let proposers = await Candidate.find({
    worksFor: id,
    role: 'proposer',
    active: true,
  });
  let seconders = await Candidate.find({
    worksFor: id,
    role: 'seconder',
    active: true,
  });
  let campaigners = await Candidate.find({
    worksFor: id,
    role: 'campaigner',
    active: true,
  });
  res.locals.temp = pop;
  res.locals.team = { proposers, seconders, campaigners };
  // console.log(proposers, seconders, campaigners);
  next();
});
exports.team = (req, res, next) => {
  res.status(200).render('myteam');
};
exports.nominationfilling = catchAsync(async (req, res, next) => {
  let person = await Candidate.findById(req.params.id);
  if (!person) next(new apierror('the person doesnot exist', 400));
  for (const property in person) {
    if (person[property] == undefined) delete person[property];
  }
  res.status(200).render('nominationfiling', {
    person,
  });
});
exports.specificpost = catchAsync(async (req, res, next) => {
  let candidates = await Candidate.find({
    post: req.params.post,
    role: 'candidate',
    active: true,
  });
  res.locals.candidates_ = candidates;
  next();
});
exports.post = (req, res, next) => {
  res.status(200).render('Allcandidatepage');
};
exports.posts = (req, res, next) => {
  res.status(200).render('admin');
};
exports.protectsaccess=catchAsync(async(req,res,next)=>{
  let user=req.user;
  let currentuser=await Candidate.findById(req.params.id);
  if(user.role!="admin"){
    if(user.role=="candidate" && currentuser.role=="candidate" && currentuser.id != user.id)
    return next(new apierror("invalid access",300));
    if(user.role=="candidate" && currentuser.role!="candidate" && currentuser.worksFor != user._id)
    return next(new apierror("invalid access",300));
    if(user.role=="candidate" && currentuser.role=="campaigner")
    return next(new apierror("invalid access",300));
  }
  return next();
});
