<template>
  <nav class="Nav" :class="{'Nav--hidden': !visible}">
    <div class="Nav__Menu">
      <nuxt-header-nav-menu/>
    </div>
  </nav>
</template>

<script>
import NuxtHeaderNavMenu from '~/components/Header/HeaderNavMenu.vue'

export default {
  computed: {
    visible() { return this.$store.state.visibleHeader }
  },
  components: {
    NuxtHeaderNavMenu
  }
}
</script>

<style lang="scss" scoped>
.Nav {
  display: block;
  position: fixed;
  z-index: 995;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  // background-color: #fff;
  @media (min-width: 991px) {
    display: flex;
    flex: 0.5;
    top: 0;
    flex-wrap: nowrap;
    overflow-y: visible;
    position: relative;
  }
  &--hidden {
    display: none;
    @media (min-width: 991px) {
      display: flex;
    }
  }
  &__Search {
    width: 100%;
    height: 60px;
    display: flex;
    border-bottom: 1px solid #dbdfe1;
    @media (min-width: 991px) {
      flex: 3;
      order: 1;
      height: 79px;
      border-bottom: none;
    }
  }
  &__Lang {
    width: 100%;
    display: flex;
    @media (min-width: 991px) {
      width: 80px;
      height: 79px;
    }
  }
  &__Menu {
    width: 100%;
    display: flex;
    border-bottom: 1px solid #dbdfe1;
    @media (min-width: 991px) {
      flex: 4;
      order: 2;
      height: 79px;
      border-bottom: none;
    }
  }
}
</style>
