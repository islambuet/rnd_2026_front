<template>
  <div class="row mb-2" v-if="!inputItem.more_values">
    <div :class="inputItem.col_class_label?inputItem.col_class_label:'col-4'" v-if="inputItem.label || inputItem.col_class_label">
      <label class="font-weight-bold float-right">{{inputItem.label}} <span class="text-danger" v-if="inputItem.mandatory">*</span></label>
    </div>
    <div :class="inputItem.col_class_input?inputItem.col_class_input:(inputItem.label || inputItem.col_class_label)?'col-lg-4 col-8':'col-12'">
      <div class="row mb-2">
        <div class="col-12">
          <div class="input-group input-group-sm">
            <div class="input-group-prepend">
              <label class="btn btn-sm bg-gradient-primary" style="cursor: pointer;">
                <input :id="inputKey" type="file" class="d-none" :data-preview-container="'#'+inputKey+'_preview_container'">
                <i class="bi bi-upload"></i> {{labels.get('label_upload_file')}}
              </label>
            </div>
            <label class="form-control custom-file-name">{{systemFunctions.getAttachedFileName(inputItem.default)}}</label>
            <div class="input-group-append clear_file" @click="resetFile(inputKey,inputItem.default)">
              <label class="btn btn-sm bg-gradient-info" style="cursor: pointer;">clear</label>
            </div>
            <input :id="inputKey+'_file_input'" type="hidden" :name="inputItem.name" :value="inputItem.default" />
          </div>
        </div>
      </div>
      <div class="row mb-2" v-if="!inputItem.hidePreview">
        <div class="col-12 system_preview_container" :id="inputKey+'_preview_container'" v-html="getAttachedFilePreviewHtml(inputItem.default)">
        </div>
      </div>
    </div>
  </div>
  <div class="row mb-2" :id="inputKey+'_system_add_more_input_container'" v-else>
    <div :class="inputItem.col_class_label?inputItem.col_class_label:'col-4'" v-if="inputItem.label || inputItem.col_class_label">
      <label class="font-weight-bold float-right">{{inputItem.label}} <span class="text-danger" v-if="inputItem.mandatory">*</span></label>
    </div>
    <div :class="inputItem.col_class_input?inputItem.col_class_input:(inputItem.label || inputItem.col_class_label)?'col-lg-4 col-8':'col-12'">
      <div class="row mb-2">
        <div class="col-12">
          <button type="button" class="system_add_more_button mr-2 mb-2 btn btn-sm bg-gradient-primary" @click="addMore(inputItem.default)"><i class="bi bi-plus-circle"></i> {{labels.get('label_add_more')}}</button>
        </div>
      </div>
    </div>
    <div class="system_add_more_content d-none">
      <div class="row mb-2 system_file_add_more_holder">
        <div class="col-12">
          <div class="row mb-2">
            <div class="col-12">
              <div class="input-group input-group-sm">
                <div class="input-group-prepend">
                  <label class="btn btn-sm bg-gradient-primary" style="cursor: pointer;">
                    <input type="file" class="d-none">
                    <i class="bi bi-upload"></i> {{labels.get('label_upload_file')}}
                  </label>
                </div>
                <label class="form-control custom-file-name"></label>
                <div class="input-group-append system_clear_file">
                  <label class="btn btn-sm bg-gradient-info" style="cursor: pointer;">clear</label>
                </div>
                <div class="input-group-append system_remove_more_button" style="cursor: pointer">
                  <label class="btn btn-sm bg-gradient-danger" style="cursor: pointer;"><i class="bi bi-dash-circle"></i></label>
                </div>
                <input type="hidden" :value="inputItem.default" />
              </div>
            </div>
          </div>
          <div class="row mb-2" v-if="!inputItem.hidePreview">
            <div class="col-12 system_preview_container">

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
    import systemFunctions from "@/assets/systemFunctions";
    import { onMounted } from 'vue'
    import labels from '@/labels'
    import globalVariables from "@/assets/globalVariables";

    const props=defineProps({
        inputItem: {
            type: Object,
            required: true
        },
        inputKey: {
          type: String,
          required: true
        },
    })
    let current_add_more_index=0;
    onMounted(() => {
      if(props.inputItem.more_values){
        for(let i=0;i<props.inputItem.more_values.length;i++){
          addMore(props.inputItem.more_values[i]);
        }
      }
    })
    const getAttachedFilePreviewHtml=(path)=>{
      let html='';
      if(path){
        let url=globalVariables.baseURLUploadedFilesLink+'/'+path;
        let extension = path.split('.').pop().split(/\#|\?/)[0];
        if(['png','jpg','jpeg','bmp','gif'].includes(extension)){
          html+=('<img alt="Image" style="max-width: 100%;max-height:200px"  src="'+url+'"/>');
        }
        else if(['mp4','mov','ogg'].includes(extension)){
          html+=('<video controls width="300px" src="'+url+'"/>');
        }
        else{
          html+=('<img alt="Not an Image" style="max-width: 100%;max-height:200px"  src="'+(globalVariables.baseUrl+'theme/images/file_no_preview.jpg')+'"/>');
        }

      }
      else{
        html+=('<img alt="Not an Image" style="max-width: 100%;max-height:200px"  src="'+(globalVariables.baseUrl+'theme/images/file_not_selected.jpg')+'"/>');
      }
      return html;
    }
    const addMore=(defaultUrl)=>{
      let curIndex=current_add_more_index;
      let html=$("#"+props.inputKey+'_system_add_more_input_container .system_add_more_content > div').clone();
      html.find('.custom-file-name').html(systemFunctions.getAttachedFileName(defaultUrl));//file name
      html.find('.system_preview_container').html(getAttachedFilePreviewHtml(defaultUrl));

      html.find('input[type=file]').attr('id',props.inputKey+'_'+curIndex);
      html.find('input[type=file]').attr('data-preview-container','#'+props.inputKey+'_'+curIndex+'_preview_container');
      html.find('input[type=hidden]').attr('id',props.inputKey+'_'+curIndex+'_file_input');
      html.find('input[type=hidden]').attr('name',props.inputItem.name+'[]')
      html.find('input[type=hidden]').val(defaultUrl)

      html.find('.system_preview_container').attr('id',props.inputKey+'_'+curIndex+'_preview_container');

      html.find('.system_remove_more_button').on('click',(event)=>{
        removeMore(event)
      })
      html.find('.system_clear_file').on('click',(event)=>{
        resetFile(props.inputKey+'_'+curIndex,defaultUrl)
      })
      $("#"+props.inputKey+'_system_add_more_input_container .system_add_more_button').parent().parent().before(html);

      current_add_more_index++;
    }
    const resetFile=(fileId,defaultUrl)=>{
      $('#'+fileId).val('').trigger('change');
      $('#'+fileId+'_preview_container').html(getAttachedFilePreviewHtml(defaultUrl));
      $('#'+fileId).closest('.input-group-prepend').next('.custom-file-name').html(systemFunctions.getAttachedFileName(defaultUrl));
    }
    const removeMore=(event)=>{
      $(event.target).closest('.system_file_add_more_holder').remove();
    }
</script>


