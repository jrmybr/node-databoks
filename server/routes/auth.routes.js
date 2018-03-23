const router = require('express').Router();

router.get('/login', (req, res) => {
  res.send('Login page')
})

// auth with jwt_token
router.get('/jwttoken', (req, res) => {
  res.send('requesting a jwt token')
})

router.get('/logout', (req,res) => {
  res.send('Logout request')
})

module.exports = router;
