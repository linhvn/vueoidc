import Oidc from 'oidc-client';

var mgr = new Oidc.UserManager({
  // userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),  
  authority: 'http://192.168.1.180:5000',
  client_id: 'js',
  client_secret: 'secret',
  redirect_uri: window.location.origin + '/callback',
  response_type: 'code',
  scope: 'openid profile offline_access',
  post_logout_redirect_uri: window.location.origin + '/logout',
  // silent_redirect_uri: window.location.origin + '/static/silent-renew.html',
  // accessTokenExpiringNotificationTime: 10,
  // automaticSilentRenew: true,
  // filterProtocolClaims: true,
  loadUserInfo: true
})

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.INFO;

mgr.events.addUserLoaded(function (user) {  
  console.log('New User Loaded：', arguments);
  console.log('Acess_token: ', user.access_token)
});

mgr.events.addAccessTokenExpiring(function () {
  console.log('AccessToken Expiring：', arguments);
});

mgr.events.addAccessTokenExpired(function () {
  console.log('AccessToken Expired：', arguments);  
  alert('Session expired. Going out!');
  mgr.signoutRedirect().then(function (resp) {
    console.log('signed out', resp);
  }).catch(function (err) {
    console.log(err)
  })
});

mgr.events.addSilentRenewError(function () {
  console.error('Silent Renew Error：', arguments);
});

mgr.events.addUserSignedOut(function () {
  alert('Going out!');
  console.log('UserSignedOut：', arguments);  
  mgr.signoutRedirect().then(function (resp) {
    console.log('signed out', resp);
  }).catch(function (err) {
    console.log(err)
  })
});

export default mgr