const Auth0Lock = require('auth0-lock');
const keys = require('../secret/keys')
const auth0 = require('auth0-js');

console.log('auth0 config');
console.log(Auth0Lock);
//
// var lock = new Auth0Lock(
//   keys.auth0.clientID,
//   keys.auth0.auth0Domain
// );
// console.log('in auth0');
var lock = new auth0.WebAuth(

  {
    clientID: keys.auth0.clientID,
    domain: keys.auth0.auth0Domain,
    auth: {
      redirectUrl: 'http://localhost:5000/profile',
      responseType: 'code',
      params: {
        scope: 'openid email' // Learn about scopes: https://auth0.com/docs/scopes
      }
    }
  });

lock.on("authenticated", function(authResult) {
  // Use the token in authResult to getUserInfo() and save it to localStorage
  lock.getUserInfo(authResult.accessToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }

    document.getElementById('nick').textContent = profile.nickname;

    localStorage.setItem('accessToken', authResult.accessToken);
    localStorage.setItem('profile', JSON.stringify(profile));
  });
});
