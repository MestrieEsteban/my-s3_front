<template>
  <div>
      <b-navbar toggleable="lg" style='background-color:#20334D !important; position: sticky; top: 0; z-index:1000' type="dark" variant="dark">
        <b-navbar-brand style='color: !important' href="/"><b-icon-folder-symlink></b-icon-folder-symlink> My-s3</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item v-if="$store.state.user" href="/user/my_data"
              ><span>My data</span></b-nav-item
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
                <em>Login / Register</em>
              </template>
              <b-dropdown-item  href="/auth/login">Login</b-dropdown-item>
              <b-dropdown-item href="/auth/register">Register</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    <Nuxt />
  </div>
</template>

<style>
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 40px;
  color: #35495e;
  letter-spacing: 1px;
}

body{
	background-color: #FFFFFF;
}

</style>

<script>
import logoutMixin from '../mixins/logout'
export default{
	mixins: [logoutMixin],
}
</script>
