<template>
  <div class="empty">
  </div>
</template>

<script>
// @ is an alias to /src
import OidcService from '@/services/OidcService'
import AuthSrv from '@/services/AuthService'

export default {
  name: 'Callback',
  mounted () {

    // UserMgr.signinRedirectCallback().then(user => {
    //   console.log('---------> user', user)
    // });
    
    let data = {}
    OidcService.getSigninResponseState().then(async signState => {
      console.log('---------> signState', signState)

      // caculate request data
      data.codeVerify = signState.state.code_verifier
      data.code = this.$route.query.code
      data.origin = window.location.origin + '/callback'
      data.reCaptcha = await this.$google.getCaptcha('loginSSO')

      AuthSrv.login(data).then(rs => {
        OidcService.endSigninCallback(signState, rs.data.data.accessToken, rs.data.data.idToken).then(user => {
          // client handler oidc user
          console.log('---------> user', user)
          this.$router.push({ name: 'Home' })
        })
      })
    })
  }
}
</script>
