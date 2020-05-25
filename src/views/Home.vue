<template>
  <div class="home">
    <div v-if="signedIn">
      <a class="nav-link" @click="signoutRedirect()">Sign out</a>
      <br />
      <pre>
        {{ loggedUser }}
      </pre>
    </div>
    <div v-else>
      <a class="nav-link" @click="signinRedirect()">Sign In</a>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import OidcService from '@/services/OidcService'

export default {
  name: 'Home',
  data () {
    return {
      loggedUser: "",
      signedIn: false
    }    
  },
  mounted () {
    console.log('mounted home', this.loggedUser)
    OidcService.getUser()
      .then(user => {
        console.log('User', user)
        if(user != null){
          this.loggedUser = JSON.stringify(user, null, 2);
          this.signedIn = true
        } else {
          OidcService.signinRedirect()
        }
      })
      .catch(err => {
        console.log('Err', err)
      })
  },
  methods: {
    signinRedirect() {
      OidcService.signinRedirect()
    },
    signoutRedirect() {
      OidcService.signoutRedirect()
    }
  }
}
</script>
