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
  res.status(200).json({
    user: req.user,
  })
})

module.exports = router;
