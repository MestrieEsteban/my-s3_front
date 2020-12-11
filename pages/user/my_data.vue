<template>
  <b-container>
    <br />
    <div>
      <b-button variant="success" v-b-modal.createBucket
        >Create Bucket</b-button
      >
    </div>
    <br />
    <b-table striped hover selectable :fields="fields" :items="bucketTable" @row-clicked="myMethod($event)" >
		<template #cell(Test)="row">
			<b-button variant="info" @click="myMethod(row)">
				    <b-icon-pencil></b-icon-pencil>
			</b-button>
			<b-button variant="danger" @click="myMethod(row)">
				    <b-icon-trash></b-icon-trash>
			</b-button>
		</template>


	</b-table>

    <b-modal hide-footer id="createBucket" title="Create Bucket">
      <b-form-input
        id="input-1"
        type="text"
        required
        v-model="create.bucketName"
        placeholder="Enter bucket name"
      ></b-form-input>
      <br />
      <b-button variant="success" @click="addBucket()">Create</b-button>
    </b-modal>
  </b-container>
</template>

<script >

export default {
  fetch({ store, redirect }) {
    if (!store.state.user) {
      redirect('/auth/login')
    }
  },
  data() {
    return {
	  bucketTable: [],
	  fields: ['id', 'Name', 'Creation date', 'Last update date', 'Test'],
      create: {
        bucketName: '',
      },
    }
  },
  methods: {
    myMethod(a) {
      console.log(a)
    },
    async getBucket() {
      this.alert = null
      this.loading = true
      let result = await this.$axios.get(
        `upload/${this.$store.state.user.user.id}/buckets`,
        {
          headers: {
            Authorization: `Bearer ${this.$store.state.user.meta.token}`,
          },
        }
      )
      if (result.data.length <= 0) {
        alert('aucun')
      } else {
        result.data.forEach((element) => {
          let createdAt = new Date(element.createdAt)
          let updateAt = new Date(element.updatedAt)
          this.bucketTable.push({
            id: element.bucketId,
            Name: element.bucketName,
            'Creation date': createdAt.toLocaleString(),
            'Last update date': updateAt.toLocaleString(),
            test: `<b-button variant="success" @click="addBucket()">Create</b-button>`,
          })
        })
      }
    },
    async addBucket() {
      console.log(this.create.bucketName)
      let data = {
        bucketName: this.create.bucketName,
      }
      let result = await this.$axios.post(
        `upload/${this.$store.state.user.user.id}/buckets`,
        data,
        {
          headers: {
            Authorization: `Bearer ${this.$store.state.user.meta.token}`,
          },
        }
      )
      if (result) {
        this.bucketTable = []
        this.create.bucketName = ''
        this.getBucket()
        this.$bvModal.hide('createBucket')
      }
    },
  },
  beforeMount() {
    this.getBucket()
  },
}
</script>

<style>
</style>
