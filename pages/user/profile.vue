<template>
  <div class="container">
    <div style="margin-top: 20px"></div>
    <b-form>
      <b-form-group id="input-group-1" label="Nickname:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.nickname"
          type="text"
          placeholder="Enter nickname"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Email:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Password:" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="form.password"
            placeholder="Enter password"
            :type="form.passwordFieldType"
            required
          >
          </b-form-input>
		  <br>
        <b-button variant="primary" @click="EditUser">Edit user</b-button>
        <b-button variant="danger" @click="deleteUser" >Delete user</b-button>
      </b-form-group>
    </b-form>
  </div>
</template>
<script src="../plugins/logout.js" type="module"></script>

<script>

import logoutMixin from '../../mixins/logout'

export default {
  mixins: [logoutMixin],
  fetch({ store, redirect }) {
    if (!store.state.user) {
      redirect('/auth/login')
    }
  },
  data() {
    return {
      form: {
        nickname: this.$store.state.user.user.nickname,
        email: this.$store.state.user.user.email,
        password: '',
        passwordFieldType: 'password',
      },
    }
  },
  methods: {
    switchVisibility() {
      this.form.passwordFieldType =
        this.form.passwordFieldType === 'password' ? 'text' : 'password'
    },
    async deleteUser() {
      const result = await this.$axios.delete(
        `users/${this.$store.state.user.user.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$store.state.user.meta.token}`,
          },
        }
      )
      if (result.data === 'User is remove') {
        alert('Votre compte a été supprimer')
        this.logOut()
      }
    },
    async EditUser() {
      const data = {
        nickname: this.form.nickname,
        email: this.form.email,
        password: this.form.password,
      }
      const result = await this.$axios.put(
        `users/${this.$store.state.user.user.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${this.$store.state.user.meta.token}`,
          },
        }
      )
      if (result) {
      }
    },
  },
}
</script>

<style></style>
