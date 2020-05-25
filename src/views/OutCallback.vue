<template>
  <div class="empty">
  </div>
</template>

<script>
// @ is an alias to /src
import OidcService from '@/services/OidcService'

export default {
  name: 'OutCallback',
  mounted () {
    this.$router.push({ name: 'Home' })    
  }
}
</script>