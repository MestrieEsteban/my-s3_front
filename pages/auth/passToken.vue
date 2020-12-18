<template>
  <div>
    <div class="container">
		<span class='title'>Password</span>
		<br>
      <b-form method="post" @submit.prevent="sendMail">
        <b-form-group
          id="input-group-1"
          label="New password :"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="password"
            type="password"
            name="password"
            required
            placeholder="Enter password"
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
      password: '',
    }
  },
  methods: {
    async sendMail(){
		const data = {
        password: this.password,
        resettoken: this.$route.query.token,
      }
		const result = await this.$axios.post(`utils/passToken`, data)
		if(result){
			this.$router.push('/auth/login')
		}
	}
  },
}
</script>
