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
			<b-button variant="info" v-b-modal.updateBucket @click="addIdUpdate(row)">
				    <b-icon-pencil></b-icon-pencil>
			</b-button>
			<b-button variant="danger" @click="deleteBucket(row)">
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

    <b-modal hide-footer id="updateBucket" title="Update Bucket">
      <b-form-input
        id="input-1"
        type="text"
        required
        v-model="update.bucketName"
        placeholder="Enter new bucket name"
      ></b-form-input>
	  
      <br />
      <b-button variant="success" @click="updateBucket()">Update</b-button>
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
      update: {
        bucketName: '',
        bucketId: '',
      },
    }
  },
  methods: {
    addIdUpdate(row) {
      this.update.bucketId = row.item.id
      this.update.bucketName = row.item.Name
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
    async deleteBucket(row) {
      let result = await this.$axios.delete(
        `upload/buckets/${row.item.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$store.state.user.meta.token}`,
          },
        }
      )
      if (result) {
		this.bucketTable = []
        this.getBucket()
      }
	},
	async updateBucket(){
		let data = {
        newBucketName: this.update.bucketName,
     	 }
		let result = await this.$axios.put(
        `upload/buckets/${this.update.bucketId}`, data,
        {
          headers: {
            Authorization: `Bearer ${this.$store.state.user.meta.token}`,
          },
        }
      )
      if (result) {
		this.bucketTable = []
        this.update.bucketName = ''
        this.getBucket()
        this.$bvModal.hide('updateBucket')
      }
	}
  },
  beforeMount() {
    this.getBucket()
  },
}
</script>

<style>
</style>
