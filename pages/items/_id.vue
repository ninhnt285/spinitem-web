<template>
  <div>
    <h1 class="Item__Title">{{ item.title }}</h1>
    <div class="Container">
      <div class="Item">
        <no-ssr>
          <v-touch class="Item__TouchArea"
            v-on:panleft="prev"
            v-on:panright="next"
            v-bind:pan-options="{ direction: 'horizontal', threshold: 20 }"
          />
        </no-ssr>
        <template v-for="(image, key) in images">
          <img
            :key="key"
            :class="{ Item__Image: true, hidden: key != currentIndex}"
            :src="image.destination.replace('%s', '_500x500_square')"
          />
        </template>
      </div>

      <div class="Images">
        <template v-for="(image, key) in images">
          <img
            class="Image__Mini"
            :key="key"
            :src="image.destination.replace('%s', '_50x50_square')"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  validate ({ params }) {
    if (!params.id) return false
    if (typeof params.id != 'string') return false
    if (params.id.length != 24) return false
    return true
  },
  data() {
    return {
      itemId: null,
      currentIndex: 0
    }
  },
  created() {
    this.itemId = this.$route.params.id
    if (this.itemId) {
      this.$store.dispatch('item/loadItem', this.itemId);
      this.$store.dispatch('image/loadImages', this.itemId);
    } else {
      this.$router.replace('/')
    }
  },
  methods: {
    prev: function($event) {
      $event.preventDefault();
      this.currentIndex--;
      if (this.currentIndex < 0) {
        this.currentIndex = this.images.length - 1;
      }
    },
    next: function($event) {
      $event.preventDefault();
      this.currentIndex++;
      if (this.currentIndex >= this.images.length) {
        this.currentIndex = 0;
      }
    }
  },
  computed: {
    ...mapGetters('image', ['getImagesByItem']),
    ...mapGetters('item', ['getItemById']),
    item() {
      return this.getItemById(this.itemId)
    },
    images() {
      return this.getImagesByItem(this.itemId)
    }
  }
}
</script>

<style lang="scss" scope>
.Container {

}

.Item {
  width: 500px;
  max-width: 50%;
  position: relative;
  float: left;
  @media (max-width: 500px) {
    max-width: 100%;
    float: none;
  }

  &__Title {
    text-align: center;
    font-size: 28px;
  }

  &__Image {
    max-width: 100%;
    display: block;
    &.hidden {
      display: none;
    }
  }

  &__TouchArea {
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
  }
}

.Images {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: flex-start;
  background-color: #EDEDED;

  .Image__Mini {
    display: inline-block;
    padding: 1px;
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
}
</style>
