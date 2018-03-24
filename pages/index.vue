<template>
  <section class="container">
    <template v-if="items.length > 0">
      <template v-for="item in items">
        <item class="item" :item="item" :key="item.id" />
      </template>
    </template>
    <template v-else>
      <p>No items found!</p>
    </template>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Item from '~/components/Item/ItemPreview'

export default {
  created() {
    // Load All Items
    if (this.isAuthenticated) {
      this.$store.dispatch('item/loadItems');
    }
  },
  computed: {
    ...mapGetters('item', ['items']),
    ...mapGetters('user', ['isAuthenticated'])
  },
  components: {
    Item
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
}

.item {
  margin: 5px;
  width: calc(25% - 10px);
  height: auto;
  @media (max-width: 1100px) {
    width: calc(33.33% - 10px);
  }
  @media (max-width: 800px) {
    width: calc(50%-10px);
  }
  @media (max-width: 500px) {
    width: calc(100%-10px);
  }
}
</style>
