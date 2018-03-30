const router = require('express').Router();

const API_ROOT = '/api/profile';

const authCheck = (req, res, next) => {
  if(!req.user){
    res.redirect('/')
  } else {
    next()
  }
};

router.get(`${API_ROOT}/`, authCheck, (req,res) => {
  console.log(req._passport.instance.Authenticator._strategies);
  res.status(200).json({
    email: req.user.email,
  })
})

module.exports = router;
