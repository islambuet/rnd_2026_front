<template>
  <div class="card d-print-none mb-2">
    <div class="card-body">
      <router-link :to="taskData.api_url" class="mr-2 mb-2 btn btn-sm bg-gradient-primary" ><i class="feather icon-corner-up-left"></i> {{labels.get('label_back')}}</router-link>
      <template v-if="item.exists">
        <button  type="button" class="mr-2 mb-2 btn btn-sm bg-gradient-primary" @click="save(false)"><i class="feather icon-save"></i> {{labels.get('label_save')}}</button>
        <button  type="button" class="mr-2 mb-2 btn btn-sm bg-gradient-primary" @click="save(true)"><i class="feather icon-plus-square"></i> {{labels.get('label_save_new')}}</button>
      </template>
    </div>
  </div>
  <div class="card d-print-none mb-2" v-if="item.exists">
    <div class="card-header">
      <div>{{labels.get('label_edit_task')}}({{item.id}})</div>
    </div>
    <div class="card-body">
      <form id="formSaveItem">
        <InputTemplate :inputItems="item.inputFields" />
      </form>
    </div>
  </div>
</template>
<script setup>

import globalVariables from "@/assets/globalVariables";
import systemFunctions from "@/assets/systemFunctions";
import toastFunctions from "@/assets/toastFunctions";
import labels from '@/labels'

import {useRouter} from "vue-router";
import {inject, reactive} from "vue";
import axios from "axios";
import InputTemplate from '@/components/InputTemplate.vue';
import {useRoute} from "vue-router/dist/vue-router";


const route =useRoute()
const router =useRouter()
let taskData = inject('taskData')
let item=reactive({
  id:0,
  exists:false,
  inputFields:{},
  data:{}
})
const setInputFields=async ()=>{
  item.inputFields= {};
  await systemFunctions.delay(1);
  let inputFields={}
  let key='save_token';
  inputFields[key] = {
    name: key,
    label: labels.get('label_'+key),
    type:'hidden',
    default:new Date().getTime(),
    mandatory:true
  };
  key='id';
  inputFields[key] = {
    name: key,
    label: labels.get('label_'+key),
    type:'hidden',
    default:item.data[key],
    mandatory:true
  };
  key='employee_id';
  inputFields[key] = {
    name: 'item[' +key +']',
    label: labels.get('label_'+key),
    type:'text',
    default:item.data[key],
    mandatory:true
  };
  key='username';
  inputFields[key] = {
    name: 'item[' +key +']',
    label: labels.get('label_'+key),
    type:'text',
    default:item.data[key],
    mandatory:true
  };
  key='password';
  inputFields[key] = {
    name: 'item[' +key +']',
    label: labels.get('label_'+key),
    type:'password',
    default:item.data[key],
    mandatory:true
  };
  key='user_group_id';
  inputFields[key] = {
    name: 'item[' +key +']',
    label: labels.get('label_'+key),
    type:'dropdown',
    default:item.data[key],
    options:taskData.user_groups.map((item)=>{ return {value:item.id,label:item.name}}),
    mandatory:true
  };
  key='trial_station_ids';
  let trail_stations=[];
  for(let i=0;i<taskData.trial_stations.length;i++){
    trail_stations.push({value:taskData.trial_stations[i].id,label:taskData.trial_stations[i].name})
    //default_trial_station_ids.push(taskData.trial_stations[i].id);
  }
  inputFields[key] = {
    name: 'item[' +key +']',
    label: labels.get('label_'+key),
    type:'checkbox',
    options:trail_stations,
    default:item.data[key].split(','),
    mandatory:true
  };
  key='trial_station_ids';
  inputFields[key] = {
    name: 'item[' +key +']',
    label: labels.get('label_'+key),
    type:'checkbox',
    options:taskData.trial_stations.filter((item)=>{ item.value=item.id.toString();item.label=item.name;return true}),
    default:item.data[key].split(','),
    mandatory:true
  };

  key='part_id';
  inputFields[key] = {
    name: 'item[' +key +']',
    label: labels.get('label_'+key),
    type:'dropdown',
    default:item.data[key],
    options:taskData.location_parts.map((item)=>{ return {value:item.id,label:item.name}}),
    mandatory:false
  };
  key='area_id';
  inputFields[key] = {
    name: 'item[' +key +']',
    label: labels.get('label_'+key),
    type:'dropdown',
    options:(item.data.part_id>0?taskData.location_areas.filter((elem)=>{ if(elem.part_id==item.data.part_id){elem.value=elem.id.toString();elem.label=elem.name;return true}}):[]),
    default:item.data[key],
    mandatory:true
  };
  key='territory_id';
  inputFields[key] = {
    name: 'item[' +key +']',
    label: labels.get('label_'+key),
    type:'dropdown',
    options:(item.data.area_id>0?taskData.location_territories.filter((elem)=>{ if(elem.area_id==item.data.area_id){elem.value=elem.id.toString();elem.label=elem.name;return true}}):[]),
    default:item.data[key],
    mandatory:true
  };
  key='email';
  inputFields[key] = {
    name: 'item[' +key +']',
    label: labels.get('label_'+key),
    type:'email',
    default:item.data[key],
    mandatory:true
  };
  key='name';
  inputFields[key] = {
    name: 'item[' +key +']',
    label: labels.get('label_'+key),
    type:'text',
    default:item.data[key],
    mandatory:true
  };
  key='mobile_no';
  inputFields[key] = {
    name: 'item[' +key +']',
    label: labels.get('label_'+key),
    type:'text',
    default:item.data[key],
    mandatory:true
  };
  key='ordering';
  inputFields[key] = {
    name: 'item[' +key +']',
    label: labels.get('label_'+key),
    type:'number',
    default:item.data[key],
    mandatory:true
  };
  key='status';
  inputFields[key] = {
    name: 'item[' +key +']',
    label: labels.get('label_'+key),
    type:'dropdown',
    options:[{label:"Active",value:'Active'},{label:"In-Active",value:'In-Active'}],
    default:item.data[key],
    mandatory:true
  };
  key='mobile_authentication_off_end';
  inputFields[key] = {
    name: 'item[' +key +']',
    label: labels.get('label_'+key),
    type:'date',
    default:systemFunctions.getDatePart(item.data[key]),
    mandatory:true
  };
  key='max_logged_browser';
  inputFields[key] = {
    name: 'item[' +key +']',
    label: labels.get('label_'+key),
    type:'dropdown',
    options:Array(10).fill(1).map((n, i) =>{ return {value:n+i,label:n+i}}),
    default:item.data[key],
    mandatory:true
  };
  item.inputFields=inputFields;
}

$(document).ready(function()
{
  $(document).off("change", "#part_id");
  $(document).on("change",'#part_id',async function()
  {
    let part_id=$(this).val();
    let key='area_id';
    item.inputFields[key].options=taskData.location_areas.filter((item)=>{ if(item.part_id==part_id){item.value=item.id.toString();item.label=item.name;return true}})
    await systemFunctions.delay(1);
    $('#'+key).val('');
    key='territory_id';
    item.inputFields[key].options=[];
    $('#'+key).val('');
  })
  $(document).off("change", "#area_id");
  $(document).on("change",'#area_id',async function()
  {
    let area_id=$(this).val();
    let key='territory_id';
    item.inputFields[key].options=taskData.location_territories.filter((item)=>{ if(item.area_id==area_id){item.value=item.id.toString();item.label=item.name;return true}})
    await systemFunctions.delay(1);
    $('#'+key).val('');
  })
});

const save=async (save_and_new)=>{
  let formData=new FormData(document.getElementById('formSaveItem'))
  await axios.post(taskData.api_url+'/save-item',formData).then((res)=>{
    if (res.data.error == "") {
      globalVariables.loadListData=true;
      toastFunctions.showSuccessfullySavedMessage();
      if(save_and_new){
        router.push(taskData.api_url+"/add")
      }
      else{
        router.push(taskData.api_url)
      }
    }
    else{
      toastFunctions.showResponseError(res.data)
    }
  });

}
const getItem=async ()=>{
  await axios.get(taskData.api_url+'/get-item/'+ item.id).then((res)=>{
    if (res.data.error == "") {
      item.data=res.data.item;
      setInputFields();
      item.exists=true;
    }
    else{
      toastFunctions.showResponseError(res.data)
    }
  });
}
if(!(taskData.permissions.action_2)){
  toastFunctions.showAccessDenyMessage();
}
else{
  item.id=route.params['item_id'];
  getItem();
}

</script>