<template>
  <p>Logout...</p>
</template>

<script>
import { removeToken } from '~/utils/auth'

export default {
  mounted () {
    removeToken()
    this.$store.dispatch('user/logout')

    this.$router.push({ path: '/' })
  }
}
</script>
