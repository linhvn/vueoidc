import Oidc from 'oidc-client';

var mgr = new Oidc.UserManager({
  // userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),  
  authority: 'http://192.168.1.180:5000',
  client_id: 'js',
  client_secret: 'secret',
  redirect_uri: window.location.origin + '/callback',
  silent_redirect_uri: window.location.origin + '/silentcallback',
  response_type: 'code',
  scope: 'openid profile offline_access',
  post_logout_redirect_uri: window.location.origin + '/logout',
  // silent_redirect_uri: window.location.origin + '/static/silent-renew.html',
  // accessTokenExpiringNotificationTime: 10,
  automaticSilentRenew: true,
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
  console.log('UserSignedOut：', arguments);
  mgr.signoutRedirect().then(function (resp) {
    console.log('signed out', resp);
  }).catch(function (err) {
    console.log(err)
  })
});

export default {
  userMgr: mgr,

  getUser: () => mgr.getUser(),

  signinRedirect: () => mgr.signinRedirect(),
  signoutRedirect: () => mgr.signoutRedirect(),
  
  getSigninResponseState: () => mgr.readSigninResponseState(window.location.href, null, true),

  endSigninCallback: (signState, accessToken, idToken) => {
      //process sigin params
      return mgr._validator._processSigninParams(signState.state, signState.response).then(res => {
        // add access token and id token to the response
        res.access_token = accessToken
        res.id_token = idToken
        let state = signState.state
        let response = mgr._validator._validateIdTokenAttributes(state, res)

        // process user claims
        return mgr._validator._processClaims(state, response).then(res => {
          var user = new Oidc.User(res)
          mgr.storeUser(user).then(() => {
            mgr.events.load(user)
          })

          // return promise
          return Promise.resolve(user);
        })
      })
  }
}