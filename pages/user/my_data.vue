
<template>
  <b-container>
    <br>
	
    <div v-show='showBucket'>
      <b-button v-b-modal.createBucket variant="success" style="float: right; width:200px">Create Bucket</b-button >
	  <br>
	</div>
    <div v-show='showBlobs'>
	  <b-icon-arrow-left-circle font-scale="1.5" style='cursor:pointer' @click="getBucket()"></b-icon-arrow-left-circle>
	  <span> /{{this.actualBucket}}</span>
	  <b-button v-b-modal.uploadBlob variant="success" style="float: right; width:200px">Upload File</b-button >
      <br>
    </div>

	<br>

    <b-table responsive striped hover selectable :fields="fieldsBucket" :items="bucketTable" @row-clicked="getBlob($event)" v-if='showBucket'>
      <template #cell(Options)="row">
        <b-button v-b-modal.updateBucket id="tooltip-button-variant1" variant="info" @click="addIdUpdate(row)">
		<b-tooltip target="tooltip-button-variant1" variant="info">Update bucket</b-tooltip>
          <b-icon-pencil></b-icon-pencil>
        </b-button>
        <b-button v-b-tooltip.hover id="tooltip-button-variant" variant="danger" @click="deleteBucket(row)">
		<b-tooltip target="tooltip-button-variant" variant="danger">Delete bucket</b-tooltip>
          <b-icon-trash></b-icon-trash>
        </b-button>
      </template>
    </b-table>


	<b-table responsive striped hover selectable :fields="fieldsBlobs" :items="blobTable" v-if='showBlobs'  @row-clicked="dowloadBlob($event)">
     <template #cell(Options)="row" >
        <b-button variant="info" id="tooltip-button-variant2" @click="copyBlob(row)">
		<b-tooltip target="tooltip-button-variant2" variant="info">Copy blob</b-tooltip>
          <b-icon-files></b-icon-files>
        </b-button>
        <b-button :href='row.item.Path' target='_blank' id="tooltip-button-variant3" variant="success" v-b-tooltip.hover>
		<b-tooltip target="tooltip-button-variant3" variant="success">Download blob</b-tooltip>
          <b-icon-cloud-download></b-icon-cloud-download>
        </b-button>
        <b-button variant="danger" v-b-tooltip.hover id="tooltip-button-variant4" title="Delete blob" @click="deleteBlob1(row)">
		  <b-tooltip target="tooltip-button-variant4" variant="danger">Delete blob</b-tooltip>
          <b-icon-trash></b-icon-trash>
        </b-button>

      </template>

	</b-table>

    <b-modal id="createBucket" hide-footer title="Create Bucket">
      <b-form-input id="input-1" v-model="create.bucketName" type="text" required placeholder="Enter bucket name">

	  </b-form-input>
      <br />
      <b-button variant="success" @click="addBucket()">Create</b-button>
    </b-modal>

    <b-modal id="updateBucket" hide-footer title="Update Bucket">
      <b-form-input id="input-1" v-model="update.bucketName" type="text" required placeholder="Enter new bucket name">
	  </b-form-input>
      <br>
      <b-button variant="success" @click="updateBucket()">Update</b-button>
    </b-modal>

    <b-modal id="uploadBlob" hide-footer title="Upload Blob">
	  <b-form-file ref="file" v-model="upload.file1" :state="Boolean(upload.file1)" placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here...">
	  </b-form-file>
	  <br><br>
      <b-button variant="success" @click="uploadBucket()">Upload</b-button>
    </b-modal>

  </b-container>
</template>

<script src="../../plugins/bucket.js" 	type="module"></script>


<style></style>


