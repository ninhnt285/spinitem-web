<template>
  <nuxt-link class="Item" :to="{ name: 'items-id', params: {id: item.id}}">
    <img class="Item__Image" :src="item.background_url.replace('%s', '_500x500_square')" />
    <div class="Item__Bar">
      <p class="Item__Title">{{ item.title }}</p>
      <p class="Item__Details">
        <span class="Item__Detail">
          <span class="image-wrapper">
            <img class="Item__Detail__Icon" src="~/static/icon/eye.png" />
          </span>
          <span class="Item__Detail__Text">12345</span>
        </span>
      </p>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style lang="scss" scope>
.Item {
  box-sizing: border-box;
  position: relative;

  &__Image {
    width: 100%;
    display: block;
  }

  &__Bar {
    width: 100%;
    position: absolute;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    box-sizing: border-box;
    padding: 7px 10px;
  }
  &__Title {
    margin: 0;
    color: #DEDEDE;
    font-size: 16px;
  }
  &__Details {
    margin: 0;
  }

  &__Detail {
    display: flex;
    &__Icon {
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }
    &__Text {
      color: #DEDEDE;
    }
  }
}
</style>
