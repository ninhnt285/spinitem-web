<template>

  <ul class="Menu">
    <template v-if="isAuthenticated">
      <li class="Menu__Item">
        <nuxt-link class="Menu__Item__Link" to="/items/add">
          Add Item
        </nuxt-link>
      </li>
      <li class="Menu__Item">
        <nuxt-link class="Menu__Item__Link" to="/shops">
          Shops
        </nuxt-link>
      </li>
      <li class="Menu__Item">
        <nuxt-link class="Menu__Item__Link" to="/auth/logout">
          Logout
        </nuxt-link>
      </li>
    </template>
    <template v-else>
      <li class="Menu__Item">
        <nuxt-link class="Menu__Item__Link" to="/auth/login">
          Login
        </nuxt-link>
      </li>
      <li class="Menu__Item">
        <nuxt-link class="Menu__Item__Link" to="/auth/register">
          Register
        </nuxt-link>
      </li>
    </template>
  </ul>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters('user', ['user', 'isAuthenticated'])
}
</script>

<style lang="scss" scoped>
.Menu
{
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  justify-content: flex-end;
  @media (min-width: 991px)
  {
    flex: 1;
    flex-wrap: nowrap;
    padding-left: 15px;
  }
  &__Item
  {
    display: flex;
    border-bottom: 1px solid #dbdfe1;
    width: 100%;
    @media (min-width: 991px)
    {
      width: auto;
      padding: 0 20px;
      border-bottom: none;
    }
    &:last-child
    {
      border-bottom: none;
    }
    &__Link
    {
      height: 60px;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      color: #000000;
      font-size: 16px;
      text-decoration: none;
      letter-spacing: 0.5px;
      &:hover
      {
        color: #41b883;
      }
      @media (min-width: 991px)
      {
        color: #ffffff;
        height: 79px;
      }
    }
    .nuxt-link-active, .nuxt-link-active:hover
    {
      color: #41b883;
    }
  }
}
</style>
