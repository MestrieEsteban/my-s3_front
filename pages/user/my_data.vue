
<template>
  <b-container>
    <br>
	
    <div v-show='showBucket'>
      <b-button v-b-modal.createBucket variant="success" style="float: right; width:200px">Create Folder</b-button >
	  <br>
	</div>

    <div v-show='showBlobs'>
	  <b-icon-arrow-left-circle font-scale="1.5" style='cursor:pointer' @click="getBucket()"></b-icon-arrow-left-circle>
	  <span> /{{this.actualBucket}}</span>
	  <b-button v-b-modal.uploadBlob variant="success" style="float: right; width:200px">Upload File</b-button >
      <br>
    </div>
	<br>
	<b-form-checkbox style="float: right; margin-top: -px; margin-left:1 -10px;" id="checkbox-1" v-model="status" name="checkbox-1" value="accepted" unchecked-value="not_accepted">
		Show items
	</b-form-checkbox>

	<br>

	<b-skeleton-table :rows="4" :columns="4" :table-props="{ bordered: true, striped: true }" v-if="!bucketIsLoded"></b-skeleton-table>
    <b-table responsive striped hover selectable :fields="fieldsBucket" :items="bucketTable" @row-clicked="getBlob($event)" v-if='showBucket && status == "not_accepted" && bucketIsLoded'>
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
	<b-row align-h="center" v-if='showBucket && status == "accepted"'>
		<b-col style='margin-top:10px;' cols='auto' v-for="item in bucketTable" :key='item.id'>
			<div style="min-width: 9rem; max-width: 9rem; border-radius: 8px; cursor:pointer;" :style='`background-color:${item.bgColor}`' v-on:click="getBlob(item)">
          		<b-icon-folder-fill font-scale="3" :variant="item.typeColor" style="padding-left:10px;"></b-icon-folder-fill>
				<b-dropdown size="lg" variant='link' toggle-class="text-decoration-none" no-caret style="padding-bottom:25px;padding-left:45px; position: absolute; ">
					<template #button-content>
					<b-icon-three-dots-vertical :style='`color: ${item.textColor} !important`'></b-icon-three-dots-vertical>
					</template>
					<b-dropdown-item variant="info" v-b-modal.updateBucket @click="addIdUpdate({'item': {'id': item.id} })">Update folder</b-dropdown-item>
					<b-dropdown-item variant="danger" @click="deleteBucket({'item': {'id': item.id} })">Delete Folder</b-dropdown-item>
				</b-dropdown>
				<br>
				<span style="padding-left:10px; font-size:20px" :style='`color: ${item.textColor} !important`'>{{item.Name}}</span>
				<br style='line-height:22px;'>
				<span style="padding-left:10px; font-size:10px" :style='`color: ${item.textColor} !important`'>{{item['Creation date']}}</span>	
			</div>
			<!-- <b-card
				:title="item.Name"
				style="min-width: 10rem;">
			<b-icon-folder v-on:click="getBlob(item)" class="h1 mb-2"></b-icon-folder> <br>
			<b-button v-b-modal.updateBucket variant="info" @click="addIdUpdate({'item': {'id': item.id} })">
				<b-icon-pencil></b-icon-pencil>
			</b-button>
			<b-button variant="danger" @click="deleteBucket({'item': {'id': item.id} })">
				<b-icon-trash></b-icon-trash>
			</b-button>
			</b-card> -->
		</b-col>
	</b-row>

	<b-table responsive striped hover selectable :fields="fieldsBlobs" :items="blobTable" v-if='showBlobs && status == "not_accepted"'  @row-clicked="dowloadBlob($event)">
     <template #cell(Options)="row" >
        <b-button variant="info" id="tooltip-button-variant2" @click="copyBlob(row)">
		<b-tooltip target="tooltip-button-variant2" variant="info">Copy blob</b-tooltip>
          <b-icon-files></b-icon-files>
        </b-button>
        <b-button v-b-modal.shareBlob variant="info" v-b-tooltip.hover id="tooltip-button-variantbb" @click="shareBlob(row)">
		  <b-tooltip target="tooltip-button-variantbb" variant="info">Share</b-tooltip>
          <b-icon-share></b-icon-share>
        </b-button>
        <b-button :href='row.item.Path' target='_blank' id="tooltip-button-variant3" variant="success" v-b-tooltip.hover>
		<b-tooltip target="tooltip-button-variant3" variant="success">Download blob</b-tooltip>
          <b-icon-cloud-download></b-icon-cloud-download>
        </b-button>
        <b-button variant="danger" v-b-tooltip.hover id="tooltip-button-variant4" @click="deleteBlob1(row)">
		  <b-tooltip target="tooltip-button-variant4" variant="danger">Delete blob</b-tooltip>
          <b-icon-trash></b-icon-trash>
        </b-button>
      </template>
	</b-table>

		<b-row align-h="center" v-if='showBlobs && status == "accepted"'>
		<b-col style='margin-top:10px;'  cols='auto' v-for="item in blobTable" :key='item.id'>
			<div style="min-width: 9rem; max-width: 9rem; background-color: #8cc3ff; border-radius: 8px; cursor:default">
				<span v-if="item.Type == 'png' || item.Type == 'jpg'">
          			<b-icon-file-earmark-image-fill font-scale="3" variant="primary" style="padding-left:10px;"></b-icon-file-earmark-image-fill>
				</span>
				<span v-else-if='item.Type == "txt"'>
          			<b-icon-file-earmark-text-fill font-scale="3" variant="primary" style="padding-left:10px;"></b-icon-file-earmark-text-fill>
				</span>
				<span v-else-if='item.Type == "pdf"'>
          			<b-icon-file-earmark-ppt-fill font-scale="3" variant="primary" style="padding-left:10px;"></b-icon-file-earmark-ppt-fill>
				</span>
				<span v-else-if='item.Type == "docx"'>
          			<b-icon-file-earmark-word-fill font-scale="3" variant="primary" style="padding-left:10px;"></b-icon-file-earmark-word-fill>
				</span>
				<span v-else-if='item.Type == "zip"'>
          			<b-icon-file-earmark-zip-fill font-scale="3" variant="primary" style="padding-left:10px;"></b-icon-file-earmark-zip-fill>
				</span>
				<span v-else-if='item.Type == "mp3" || item.Type == "mp4" || item.Type == "wav"'>
          			<b-icon-file-music-fill font-scale="3" variant="primary" style="padding-left:10px;"></b-icon-file-music-fill>
				</span>
				<span v-else-if='item.Type == "csv"'>
          			<b-icon-file-earmark-spreadsheet-fill font-scale="3" variant="primary" style="padding-left:10px;"></b-icon-file-earmark-spreadsheet-fill>
				</span>
				<span v-else>
          			<b-icon-file-earmark-fill font-scale="3" variant="primary" style="padding-left:10px;"></b-icon-file-earmark-fill>
				</span>
				<b-dropdown size="lg" variant='link' toggle-class="text-decoration-none" no-caret style="padding-bottom:25px;padding-left:45px; position: absolute; ">
					<template #button-content>
					<b-icon-three-dots-vertical style='color: #007BFF !important'></b-icon-three-dots-vertical>
					</template>
					<b-dropdown-item variant="info" @click="copyBlob({'item': {'id': item.id} })">Copy File</b-dropdown-item>
					<b-dropdown-item v-b-modal.shareBlob variant="info" @click="shareBlob({'item': {'id': item.id} })">Share File</b-dropdown-item>
					<b-dropdown-item variant="success" :href='item.Path'>Download File</b-dropdown-item>
					<b-dropdown-item variant="danger" @click="deleteBlob1({'item': {'id': item.id} })">Delete File</b-dropdown-item>
				</b-dropdown>
				<br>
				<span style="padding-left:10px; color:#007BFF; font-size:20px">{{item.Name}}</span>
				<br style='line-height:22px;'>
				<span style="padding-left:10px; color:#007BFF; font-size:10px">{{item['Creation date']}}</span>
			</div>



			<!-- <b-card
				:img-src="item.Path"
				:title="item.Name"
				style="min-width: 10rem; max-width: 10rem">
			<br>
			<b-button variant="info" id="tooltip-button-variant2" @click="copyBlob({'item': {'id': item.id} })">
				<b-tooltip target="tooltip-button-variant2" variant="info">Copy blob</b-tooltip>
				<b-icon-files></b-icon-files>
			</b-button>
			<b-button v-b-modal.shareBlob variant="info" v-b-tooltip.hover id="tooltip-button-variantbb" @click="shareBlob({'item': {'id': item.id} })">
				<b-tooltip target="tooltip-button-variantbb" variant="info">Share</b-tooltip>
				<b-icon-share></b-icon-share>
			</b-button>
			<b-button :href='item.Path' target='_blank' id="tooltip-button-variant3" variant="success" v-b-tooltip.hover>
				<b-tooltip target="tooltip-button-variant3" variant="success">Download blob</b-tooltip>
				<b-icon-cloud-download></b-icon-cloud-download>
			</b-button>
				<b-button variant="danger" v-b-tooltip.hover id="tooltip-button-variant4" @click="deleteBlob1({'item': {'id': item.id} })">
				<b-tooltip target="tooltip-button-variant4" variant="danger">Delete blob</b-tooltip>
				<b-icon-trash></b-icon-trash>
			</b-button>
			
			</b-card> -->
		</b-col>
	</b-row>

    <b-modal id="createBucket" hide-footer title="Create Bucket">
      <b-form-input id="input-1" v-model="create.bucketName" type="text" required placeholder="Enter bucket name">
	  </b-form-input>
	  <b-form-group label="Color :" v-slot="{ ariaDescribedby  }">
		<b-form-radio v-model="create.selected" :aria-describedby="ariaDescribedby" name="some-radios" value="red">Red</b-form-radio>
		<b-form-radio v-model="create.selected" :aria-describedby="ariaDescribedby" name="some-radios" value="blue">Blue</b-form-radio>
		<b-form-radio v-model="create.selected" :aria-describedby="ariaDescribedby" name="some-radios" value="yellow">Yellow</b-form-radio>
      </b-form-group>
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

    <b-modal id="shareBlob" hide-footer title="Shared Blob">
	  
	  <b-form-input v-model="share.link">
	  </b-form-input>
	  <br>
	  <b-button variant="success" :href="this.share.link">Go to</b-button>
	  <br> <br>
	  <b-img :src="this.share.link" fluid alt="Responsive image"></b-img>
    </b-modal>

  </b-container>
</template>

<script src="../../plugins/bucket.js" 	type="module"></script>


<style>


</style>


