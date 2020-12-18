<template>
  <section class="section">
    <div class="container">
      <div class="columns">
		<span class='title'>Connection</span>
		<br>
        <div class="column is-4 is-offset-4">
          <form method="post" @submit.prevent="login">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <b-form-input
                  v-model="email"
                  type="email"
                  class="input"
                  name="email"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <b-form-input
                  v-model="password"
                  type="password"
                  class="input"
                  name="password"
                />
              </div>
            </div>
			<br>
            <div class="control">
              <b-button variant="primary" type="submit" class="button is-dark is-fullwidth">
                Log In
              </b-button>
              <b-button variant="danger" href="/auth/resetPassword" class="button is-dark is-fullwidth">
				  Forgot password
              </b-button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  components: {},
  transition: "intro",
  

  data() {
    return {
      email: '',
      password: '',
      error: null,
    }
  },

  methods: {
    async login() {
      this.alert = null
      this.loading = true
      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password,
        })
        .then((result) => {
          if (result.data.message) {
            alert(result.data.message)
            return
          }
          this.loading = false
          this.$router.push('/user/profile')
        })
        .catch((error) => {
          this.loading = false
          if (error.response && error.response.data) {
            this.alert = {
              type: 'error',
              message: error.response.data.message || error.reponse.status,
            }
          }
        })
    },
  },
}
</script>
