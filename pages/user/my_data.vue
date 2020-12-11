<template>
  <b-container>
    <br />
    <div>
      <b-button v-b-modal.createBucket variant="success"
        >Create Bucket</b-button
      >
    </div>
    <br />
    <b-table
      striped
      hover
      selectable
      :fields="fields"
      :items="bucketTable"
      @row-clicked="myMethod($event)"
    >
      <template #cell(Test)="row">
        <b-button
          v-b-modal.updateBucket
          variant="info"
          @click="addIdUpdate(row)"
        >
          <b-icon-pencil></b-icon-pencil>
        </b-button>
        <b-button variant="danger" @click="deleteBucket(row)">
          <b-icon-trash></b-icon-trash>
        </b-button>
      </template>
    </b-table>

    <b-modal id="createBucket" hide-footer title="Create Bucket">
      <b-form-input
        id="input-1"
        v-model="create.bucketName"
        type="text"
        required
        placeholder="Enter bucket name"
      ></b-form-input>
      <br />
      <b-button variant="success" @click="addBucket()">Create</b-button>
    </b-modal>

    <b-modal id="updateBucket" hide-footer title="Update Bucket">
      <b-form-input
        id="input-1"
        v-model="update.bucketName"
        type="text"
        required
        placeholder="Enter new bucket name"
      ></b-form-input>

      <br />
      <b-button variant="success" @click="updateBucket()">Update</b-button>
    </b-modal>
  </b-container>
</template>

<script>
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
  beforeMount() {
    this.getBucket()
  },
  methods: {
    addIdUpdate(row) {
      this.update.bucketId = row.item.id
      this.update.bucketName = row.item.Name
    },
    async getBucket() {
      this.alert = null
      this.loading = true
      const result = await this.$axios.get(
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
          const createdAt = new Date(element.createdAt)
          const updateAt = new Date(element.updatedAt)
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
      const data = {
        bucketName: this.create.bucketName,
      }
      const result = await this.$axios.post(
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
      const result = await this.$axios.delete(`upload/buckets/${row.item.id}`, {
        headers: {
          Authorization: `Bearer ${this.$store.state.user.meta.token}`,
        },
      })
      if (result) {
        this.bucketTable = []
        this.getBucket()
      }
    },
    async updateBucket() {
      const data = {
        newBucketName: this.update.bucketName,
      }
      const result = await this.$axios.put(
        `upload/buckets/${this.update.bucketId}`,
        data,
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
    },
  },
}
</script>

<style></style>
