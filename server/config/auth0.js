// const Auth0Lock = require('auth0-lock');
// const keys = require('../secret/keys')
//
// var lock = new Auth0Lock(
//   keys.auth0.clientID,
//   keys.auth0.auth0Domain
// );
//
// lock.on("authenticated", function(authResult) {
//   // Use the token in authResult to getUserInfo() and save it to localStorage
//   lock.getUserInfo(authResult.accessToken, function(error, profile) {
//     if (error) {
//       // Handle error
//       return;
//     }
//
//     document.getElementById('nick').textContent = profile.nickname;
//
//     localStorage.setItem('accessToken', authResult.accessToken);
//     localStorage.setItem('profile', JSON.stringify(profile));
//   });
// });
