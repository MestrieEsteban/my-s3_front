<template>
  <div>
    <div class="container">
		<span class='title'>Reset Password</span>
		<br>
      <b-form method="post" @submit.prevent="sendMail">
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="email"
            type="email"
            name="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Send</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: 'esteban94.em@gmail.com',
     
    }
  },
  methods: {
    async sendMail(){
		const data = {
        email: this.email,
      }
		const result = await this.$axios.post(`utils/resetpassword`, data)
	}
  },
}
</script>
