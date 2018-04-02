<template>
  <div>
    <h2>Your Shops</h2>
    <div class="Container">
      <template v-for="shop in shops">
        <nuxt-link class="Shop" :to="{ name: 'shops-id', params: {id: shop.id}}" :key="shop.id">
          <p class="Shop__Title">
            <span :class="{shop: true, 'shop-shopify': shop.platform == 'shopify'}"></span>
            {{ shop.key }}
          </p>
        </nuxt-link>
      </template>

      <div class="Shop AddShop" @click="openAddShop">
        <div v-if="showAddShop">
          <div class="form-group">
            <p class="form-message error" v-if="addShopMessage">{{ addShopMessage }}</p>
            <div class="input-group">
              <label>What is your website platform? *</label>
              <select class="input-control" v-model="platform">
                <option disabled value="">Select your platform</option>
                <option value="shopify">Shopify</option>
              </select>
            </div>

            <div v-if="platform == 'shopify'" class="input-group">
              <label>What is your website domain? *</label>
              <input class="input-control" type="text" v-model="key" />
              <span class="input-control-addon">.myshopify.com</span>
            </div>

            <button class="button SubmitButton" @click="submitAddShop">Submit</button>
          </div>
        </div>
        <span v-else>New Shop</span>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      showAddShop: false,
      addShopMessage: null,
      platform: '',
      key: ''
    }
  },
  created() {
    this.$store.dispatch('shop/loadShops')
  },
  computed: {
    ...mapGetters('shop', ['shops'])
  },
  methods: {
    openAddShop(e) {
      e.preventDefault()
      this.showAddShop = true
    },
    submitAddShop(e) {
      e.preventDefault()
      this.addShopMessage = null

      this.$store.dispatch('shop/addShop', {
        platform: this.platform,
        key: this.key
      })
        .then(newShop => {
          this.showAddShop = false
          this.platform = ''
          this.key = ''

          switch(newShop.platform) {
            case 'shopify':
              let redirectUri = encodeURIComponent(process.env.clientURL + "/shops/redirect/shopify")
              let nonce = newShop.session
              let scopes = 'read_themes,write_themes,read_products,write_products,read_product_listings,read_collection_listings'
              let link = `https://${newShop.key}.myshopify.com/admin/oauth/authorize?client_id=${process.env.shopifyAPIKey}&scope=${scopes}&redirect_uri=${redirectUri}&state=${nonce}`
              window.location.replace(link)
              break;
            default:
              break;
          }

        })
        .catch(err => {
          this.addShopMessage = err.message
        })
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  text-align: center;
}

.Container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.Shop {
  box-sizing: border-box;
  background-color: #DEDEDE;
  width: calc(33.33% - 10px);
  margin: 5px;
  padding: 10px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  @media (max-width: 1100px) {
    width: calc(50% - 10px);
  }
  @media (max-width: 600px) {
    width: calc(100% - 10px)
  }

  &.AddShop {
    cursor: pointer;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    &:hover {
      background-color: #EFEFEF;
    }
  }

  &__Title {
    margin: 0;
    display: flex;
    line-height: 28px;
    height: 24px;
    font-weight: bold;
    align-self: center;
  }

  .SubmitButton {
    float: right;
    background-color: #41b883;
    color: #fff !important;
    cursor: pointer;
  }
}
</style>
