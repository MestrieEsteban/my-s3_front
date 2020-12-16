<template>
  <div class="container">
    <div style="margin-top: 20px"></div>
    <b-col lg="9"
      ><b-button style="float: right" variant="danger" @click="deleteUser"
        >Delete</b-button
      >
    </b-col>
    <b-col lg="8"
      ><b-button style="float: right" variant="primary" @click="EditUser"
        >Edit</b-button
      ></b-col
    >
    <b-form>
      <b-form-group id="input-group-1" label="Nickname:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.nickname"
          type="text"
          placeholder="Enter nickname"
          style="width: 600px"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Email:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          style="width: 600px"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Password:" label-for="input-3">
        <b-form inline
          ><b-form-input
            id="input-3"
            v-model="form.password"
            placeholder="Enter password"
            :type="form.passwordFieldType"
            required
            style="width: 600px"
          >
          </b-form-input>
          <div style="margin-left: 20px"></div>
          <b-button type="password" @click="switchVisibility"
            >show / hide</b-button
          >
        </b-form>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import auth from '../../plugins/logout'
export default {
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
        password: this.$store.state.user.user.password,
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
        // await auth.methods.logOut()
      }
    },
    EditUser() {},
  },
}
</script>

<style></style>
