export default { 
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
