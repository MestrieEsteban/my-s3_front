<template>
  <div>
    <div>
      <b-navbar toggleable="lg" style='background-color:#20334D;'>
        <b-navbar-brand href="/">My-s3</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item v-if="$store.state.user" href="/user/my_data"
              >My data</b-nav-item
            >
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown v-if="$store.state.user" right>
              <template #button-content>
                <em>{{ $store.state.user.user.nickname }}</em>
              </template>
              <b-dropdown-item href="/user/profile">Profile</b-dropdown-item>
              <b-dropdown-item @click="logOut()">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown v-else right>
              <template #button-content>
                <em>User</em>
              </template>
              <b-dropdown-item href="/auth/login">Login</b-dropdown-item>
              <b-dropdown-item href="/auth/register">Register</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <Nuxt />
  </div>
</template>

<style></style>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  methods: {
    async logOut() {
      this.$store
        .dispatch('reset')
        .then((result) => {
          this.$router.push('/')
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
