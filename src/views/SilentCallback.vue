<template>
  <div class="empty">
  </div>
</template>

<script>
// @ is an alias to /src
import OidcService from '@/services/OidcService'

export default {
  name: 'SilentCallback',
  mounted () {
    console.log('-----------> silent query', this.$route.query)
    OidcService.userMgr.signinSilentCallback()
  }
}
</script>