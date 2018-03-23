const router = require('express').Router();

router.get('/login', (req, res) => {
  res.send('Login page')
})

// auth with jwt_token
router.get('/update', (req, res) => {
  res.send('update page')
})

router.get('/logout', (req,res) => {
  res.send('Logout request')
})

module.exports = router;
