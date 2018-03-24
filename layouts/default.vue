<template>
  <div>
    <main-nav />
    <div :class="{'App--hidden': visible, 'App': true}">
      <nuxt />
    </div>
  </div>

</template>

<script>
import MainHeader from '~/components/Header/Header.vue'

export default {
  watch: {
    $route: 'setStore'
  },
  computed: {
    visible() { return this.$store.state.visibleHeader }
  },
  methods: {
    setStore() {
      if (this.$store.state.visibleHeader) this.$store.commit('toggle', 'visibleHeader')
    }
  },
  components: {
    mainNav: MainHeader
  }
}
</script>

<style lang="scss" scoped>
.App {
  padding: 0;

  &--hidden {
    display: none;
    @media (min-width: 992px) {
      display: block;
    }
  }
}
</style>
