<template>

  <div>
    <h2>Register</h2>
    <div class="Container">
      <form class="form-group">
        <p class="form-message error" v-if="registerMessage">{{ registerMessage }}</p>
        <input v-model="username" type="text" placeholder="Username" />
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button class="button" @click="register">Submit</button>
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
    this.$store.commit('user/SET_REGISTER_MESSAGE', null)
    this.redirect()
  },
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  computed: mapGetters('user', ['isAuthenticated', 'registerMessage']),
  methods: {
    register(event) {
      event.preventDefault()

      this.$store.commit('user/SET_REGISTER_MESSAGE', null)
      this.$store.dispatch('user/register', {
        username: this.username,
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
