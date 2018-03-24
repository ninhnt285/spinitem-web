<template>
  <div class="Container">
    <div class="Item">
      <div class="Item__View">
        <no-ssr>
          <v-touch class="Item__View__TouchArea"
            v-on:panleft="prev"
            v-on:panright="next"
            v-bind:pan-options="{ direction: 'horizontal', threshold: 20 }"
          />
        </no-ssr>
        <template v-for="(image, key) in images">
          <img
            :key="key"
            :class="{ Item__View__Image: true, hidden: key != currentIndex}"
            :src="image.destination.replace('%s', '_500x500_square')"
          />
        </template>
      </div>

      <div class="Item__Share">
        <h1 class="Item__Title">{{ item.title }}</h1>

        <div class="Item__Share__Box">
          <h2>Embed Code</h2>
          <div class="Item__Share__Box__Content">
            <textarea v-model="embedCode"></textarea>
          </div>
        </div>

        <div class="Item__Share__Box">
          <h2>Social Share</h2>
          <div class="Item__Share__Box__Content">
            <button>Facebook</button>
            <button>Twitter</button>
            <button>Google Plus</button>
          </div>
        </div>
      </div>
      <!--
      <div class="Images">
        <template v-for="(image, key) in images">
          <img
            class="Image__Mini"
            :key="key"
            :src="image.destination.replace('%s', '_50x50_square')"
          />
        </template>
      </div>
    -->
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
      currentIndex: 0,
      embedCode: ''
    }
  },
  created() {
    this.itemId = this.$route.params.id
    if (this.itemId) {
      this.embedCode = `<spin-item item-id="${this.itemId}" \/>\n<script src="\/\/static.spinitem.com\/js\/spin-item.js"><\/script>`
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
  background-color: #DEDEDE;
  flex: 0 0 auto;
  display: flex;
  @media (max-width: 500px) {
    flex-direction: column;
  }
  &__Title {
    text-align: center;
    font-size: 28px;
    margin: 20px 10px;
    color: #222222;
    font-weight: 500;
  }

  &__View {
    width: 500px;
    max-width: 50%;
    position: relative;
    flex-grow: 0;
    @media (max-width: 500px) {
      flex-grow: 1;
      max-width: 100%;
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

  &__Share {
    flex-grow: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;

    &__Box {
      width: 100%;
      margin-bottom: 15px;
      h2 {
        font-size: 20px;
        margin: 10px 0;
        color: #222222;
        font-weight: 400;
      }

      &__Content {
        textarea {
          width: 100%;
          resize: none;
        }
      }
    }
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
