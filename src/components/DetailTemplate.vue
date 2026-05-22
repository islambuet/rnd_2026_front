<template>
    <template  v-for="detailField in detailFields" >
      <div class="row mb-2">
        <div class="col-4">
          <label class="font-weight-bold float-right">{{labels.get(detailField.label)}}</label>
        </div>
        <div class="col-lg-4 col-8">
          <div class="row mb-2" v-for="fieldValue in detailField.values" >
            <div class="col-12" v-if="detailField.type=='image'">
              <img style="max-width: 100%;max-height:200px" :src="(fieldValue)">
            </div>
            <div class="col-12" v-else-if="detailField.type=='file'">
              <button type="button" class="mr-2 mb-2 btn btn-sm bg-gradient-primary" @click="systemFunctions.downloadUrl(fieldValue)"><i class="feather icon-download"></i> {{labels.get('label_download')}}</button>
            </div>
            <div class="col-12" v-else-if="detailField.type=='date'">
              {{systemFunctions.displayDate(fieldValue)}}
            </div>
            <div class="col-12" v-else-if="detailField.type=='date-time'">
              {{systemFunctions.displayDateTime(fieldValue)}}
            </div>

            <div class="col-12" v-else>
              {{fieldValue}}
            </div>
          </div>

        </div>
      </div>
    </template>
</template>
<script setup>
    import systemFunctions from "@/assets/systemFunctions";
    import labels from '@/labels'   
//type==image,file,date,date-time
    const props=defineProps({
      detailFields: {
            type: Object,
            required: true
        },        
        
    })

    
</script>


