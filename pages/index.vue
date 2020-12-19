<template>
  <b-container>
    <b-row style="margin-top: 5%">
      <b-col cols="12" md="6" style="background-color: #">
        <span class="title">Your data is precious</span>
        <span class="subtitle"
          >My-s3 is a fast and secure storage, accessible from anywhere</span
        >

        <br />
        <br />
        <b-button href="/user/my_data" variant="outline-primary"
          >Go to My-s3 data</b-button
        >
        <b-button
          v-if="!$store.state.user"
          href="/auth/register"
          variant="primary"
          >Create account</b-button
        >
      </b-col>
      <b-col style="background-color: ">
        <br />
        <b-img v-if="cat"
          :src="cat"
          fluid
          alt="Cat"
        ></b-img>
      </b-col>
      <!-- <b-col style="background-color: ">
        <b-img src="https://picsum.photos/1024/400/?image=41" fluid alt="Responsive image"
        ></b-img>
      </b-col> -->
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
	  return {
		  cat : '',
	  }
  },
  mounted() {
    this.getCat()
  },
  methods: {
	  getCat(){
		  fetch('https://aws.random.cat/meow')
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				this.cat = data.file
			});
	  },
  },
}
</script>

<style>
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-size: 6vh;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 3vh;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.oui {
  height: 200vh;
  min-height: 500px;
  width: 100%;
  background-attachment: fixed;
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
