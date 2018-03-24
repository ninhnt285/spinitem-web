<template>

  <div>
    <h2>Login</h2>
    <div class="Container">
      <form class="form-group" @submit="login">
        <p class="form-message error" v-if="loginMessage">{{ loginMessage }}</p>
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button class="button">Submit</button>
      </form>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  watch: {
    isAuthenticated: 'redirect'
  },
  created() {
    this.$store.commit('user/SET_LOGIN_MESSAGE', null)
    this.redirect()
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: mapGetters('user', ['isAuthenticated', 'loginMessage']),
  methods: {
    login(event) {
      event.preventDefault()
      this.$store.commit('user/SET_LOGIN_MESSAGE', null)
      this.$store.dispatch('user/login', {
        email: this.email,
        password: this.password
      });
    },
    redirect() {
      if (this.isAuthenticated) {
        this.$router.replace({ path: '/' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  text-align: center;
}

.Container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.button {
  float: right;
  background-color: #41b883;
  color: #fff;
  cursor: pointer;
}
</style>
