<template>

  <p>Processing...</p>

</template>

<script>
export default {
  created() {
    if (process.server) return

    var payload = this.$route.query
    payload.platform = this.$route.params.platform

    this.$store.dispatch('shop/verify', payload)
      .finally(() => {
        this.$router.replace('/shops')
      })
  }
}
</script>

<style scoped>
p {
  text-align: center;
}
</style>
