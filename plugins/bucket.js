
export default {
	fetch({ store, redirect }) {
		if (!store.state.user) {
			redirect('/auth/login')
		}
	},
	data() {
		return {
			showBlobs: 0,
			showBucket: 1,
			actualBucket: '',
			bucketTable: [],
			blobTable: [],
			fieldsBucket: ['id', 'Name', 'Creation date', 'Last update date', 'Test'],
			fieldsBlobs: ['id', 'Name', 'Size', 'Type', 'Creation date', 'Last update date', 'Test'],
			create: {
				bucketName: '',
			},
			update: {
				bucketName: '',
				bucketId: '',
			},
			upload: {
				file1: '',
				file: '',
				idBucket: '',
				Name: ''
			}
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
				this.bucketTable = []
			} else {
				this.bucketTable = []
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
			this.showBlobs = 0
			this.showBucket = 1
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

		async getBlob(event) {
			const result = await this.$axios.get(
				`upload/buckets/${event.id}/blobs`,
				{
					headers: {
						Authorization: `Bearer ${this.$store.state.user.meta.token}`,
					},
				}
			)
			if (result.data.length == 0) {
				this.blobTable = []	
			} else {
				this.blobTable = []
				result.data.forEach((element) => {
					const createdAt = new Date(element.createdAt)
					const updateAt = new Date(element.updatedAt)
					this.blobTable.push({
						id: element.blobId,
						Name: element.blobName,
						Size: this.FileConvertSize(element.blobSize),
						Type: element.blobExt,
						'Creation date': createdAt.toLocaleString(),
						'Last update date': updateAt.toLocaleString(),
					})
				})
			}
			this.actualBucket = event.Name
			this.showBlobs = 1
			this.showBucket = 0
			this.upload.idBucket = event.id
			this.upload.Name = event.Name
		},
		async uploadBucket() {
			this.upload.file = this.$refs.file.files[0];
			let formData = new FormData();
			formData.append('file', this.upload.file);
			let result = await this.$axios.post(`upload/blob/${this.$store.state.user.user.id}/${this.upload.idBucket}`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${this.$store.state.user.meta.token}`,
					},
				}
			)
			if (result) {
				this.getBlob({ 'id': this.upload.idBucket, 'Name':this.upload.Name })
				this.$bvModal.hide('uploadBlob')
			}
		},
		async dowloadBlob(event) {
			const result = await this.$axios.get(
				`https://team-foster.s3.eu-west-3.amazonaws.com/flux/1588235492144.png`,
				{
					headers: {
						Authorization: `Bearer ${this.$store.state.user.meta.token}`,
					},
				},
				{ responseType: 'Blob' },

			)
			if (result) {
				console.log(result)
				const url = window.URL.createObjectURL(new Blob([result.data], { type: 'image/png' }))
				const link = document.createElement('a')
				const contentDisposition = result.headers['content-disposition']
				console.log(contentDisposition);

				let fileName = 'unknown'
				if (contentDisposition) {
					let fileNameMatch = contentDisposition.match(/filename="(.+)"/)
					if (!fileNameMatch) {
						fileNameMatch = contentDisposition.match(/filename=(.+)/)
						if (fileNameMatch.length === 2) { fileName = fileNameMatch[1] }
					} else if (fileNameMatch.length === 2) { fileName = fileNameMatch[1] }
				}
				link.href = url
				link.setAttribute('download', fileName)
				document.body.appendChild(link)

				link.click()
				link.remove()
				window.URL.revokeObjectURL(url)
			}
			
		},






		FileConvertSize(aSize) {
			aSize = Math.abs(parseInt(aSize, 10));
			var def = [[1, 'octets'], [1024, 'ko'], [1024 * 1024, 'Mo'], [1024 * 1024 * 1024, 'Go'], [1024 * 1024 * 1024 * 1024, 'To']];
			for (var i = 0; i < def.length; i++) {
				if (aSize < def[i][0]) return (aSize / def[i - 1][0]).toFixed(2) + ' ' + def[i - 1][1];
			}
		}

	},
}