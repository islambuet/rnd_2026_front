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
      <div>{{labels.get('label_new_task')}}</div>
    </div>
    <div class="card-body">
      <form id="formSaveItem">
        <InputTemplate :inputItems="item.inputFields" />
      </form>
    </div>
  </div>
</template>
<script setup>
  import systemFunctions from "@/assets/systemFunctions";
  import globalVariables from "@/assets/globalVariables";
  import toastFunctions from "@/assets/toastFunctions";
  import labels from '@/labels'
  
  import {useRouter} from "vue-router";
  import {inject, reactive} from "vue";
  import axios from "axios";
  import InputTemplate from '@/components/InputTemplate.vue';

  

  const router =useRouter()
  let taskData = inject('taskData')
  let item=reactive({
    id:0,
    exists:false,
    inputFields:{},
    data:{
      id:0,
      employee_id:'',
      username:'',
      password:'',
      user_group_id:3,
      email:'',
      name:'',
      mobile_no:'',
    }
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
    item.inputFields=inputFields;
  }
  const save=async (save_and_new)=>{
    let formData=new FormData(document.getElementById('formSaveItem'))
    await axios.post(taskData.api_url+'/save-item',formData).then((res)=>{
      if (res.data.error == "") {
        globalVariables.loadListData=true;
        toastFunctions.showSuccessfullySavedMessage();
        if(save_and_new){
          setInputFields();
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
  if(!(taskData.permissions.action_1)){
    toastFunctions.showAccessDenyMessage();
  }
  else{
    setInputFields();
    item.exists=true;
  }

</script>