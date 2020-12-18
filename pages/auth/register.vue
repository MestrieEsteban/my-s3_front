<template>
  <div>
    <div class="container">
		<span class='title'>Create account</span>
		<br>
      <b-form v-if="show" method="post" @submit.prevent="register">
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

        <b-form-group
          id="input-group-2"
          label="Your nickname:"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="nickname"
            name="nickname"
            required
            placeholder="Enter nickname"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Your password:"
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            v-model="password"
            type="password"
			:state="chackPassword1"
            name="password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Your password confirmation:"
          label-for="input-4"
        >
          <b-form-input
            id="input-4"
            v-model="passwordConfirmation"
            type="password"
			:state="chackPassword2"
            name="passwordConfirmation"
            required
            placeholder="Enter password confirmation"
          ></b-form-input>
        </b-form-group>
  		<b-alert v-model="passShow" variant="danger">Password not match</b-alert>

        <b-button type="submit" variant="primary">Register</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: 'esteban94.em@gmail.com',
      nickname: 'Esteban',
      password: '',
      passwordConfirmation: '',
      show: true,
      passShow: false,
    }
  },
  computed: {
      chackPassword1() {
        return this.password.length > 0 ? true : false
      },
      chackPassword2() {
        if(this.passwordConfirmation.length > 0){
			if(this.password === this.passwordConfirmation){
				this.passShow = false
				return true
			}else{
				this.passShow = true
				return false
			}
		}else{
			return false
		}
      },
    },
  methods: {
    async register() {
      this.alert = null
      this.loading = true
      this.$store
        .dispatch('register', {
          email: this.email,
          nickname: this.nickname,
          password: this.password,
          passwordConfirmation: this.passwordConfirmation,
        })
        .then((result) => {
          console.log(result.data.message)
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
