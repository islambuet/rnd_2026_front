<template>
  <div class="row mb-2" v-if="!inputItem.more_values">
    <div class="col-4">
      <label class="font-weight-bold float-right">{{inputItem.label}} <span class="text-danger" v-if="inputItem.mandatory">*</span></label>
    </div>
    <div class="col-lg-4 col-8">
      <div class="input-group" >
        <select :id="inputKey" class="form-control" :class="inputItem.class? inputItem.class:null" :name="inputItem.name">
          <option v-if="!inputItem.noselect" value="">{{labels.get('label_select')}}</option>
          <option v-for="(option, i) in inputItem.options" :key="i" :value="option.value" :selected="inputItem.default==option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>
  </div>
  <div class="row mb-2" :id="inputKey+'_system_add_more_input_container'" v-else>
    <div class="col-4">
      <label class="font-weight-bold float-right">{{inputItem.label}} <span class="text-danger" v-if="inputItem.mandatory">*</span></label>
    </div>
    <div class="col-lg-4 col-8">
      <div class="row mb-2">
        <div class="col-12">
          <button type="button" class="system_add_more_button mr-2 mb-2 btn btn-sm bg-gradient-primary" @click="addMore(inputItem.default)"><i class="bi bi-plus-circle"></i> {{labels.get('label_add_more')}}</button>
        </div>
      </div>
    </div>
    <div class="system_add_more_content d-none">
      <div class="row mb-2">
        <div class="col-12">
          <div class="input-group">
            <select class="form-control" :class="inputItem.class? inputItem.class:null" >
              <option v-if="!inputItem.noselect" value="">{{labels.get('label_select')}}</option>
              <option v-for="(option, i) in inputItem.options" :key="i" :value="option.value">
                {{ option.label }}
              </option>
            </select>
            <div class="input-group-append system_remove_more_button" style="cursor: pointer">
              <span class="input-group-text bg-gradient-danger"><i class="bi bi-dash-circle"></i></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
    import { onMounted } from 'vue'
    import labels from '@/labels'
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
    const addMore=(defaultValue)=>{
      let curIndex=current_add_more_index;
      let html=$("#"+props.inputKey+'_system_add_more_input_container .system_add_more_content > div').clone();
      html.find('select').attr('id',props.inputKey+'_'+curIndex)
      html.find('select').attr('name',props.inputItem.name+'[]')
      html.find('select').val(defaultValue)
      html.find('.system_remove_more_button').on('click',(event)=>{
        removeMore(event)
      })
      $("#"+props.inputKey+'_system_add_more_input_container .system_add_more_button').parent().parent().before(html);
      current_add_more_index++;
    }
    const removeMore=(event)=>{
      $(event.target).closest('.row').remove();
    }
</script>


