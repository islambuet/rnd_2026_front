<template>
  <div class="card d-print-none mb-2">
    <div class="card-header">
      <div>{{labels.get('label_welcome')}} {{globalVariables.user.name}}</div>
    </div>
    <div class="card-body">
      <div id="accordion">
        <div class="card">
          <div class="card-header p-1">
            <a class="btn btn-sm" data-toggle="collapse" href="#label_qr_code">{{labels.get('label_qr_code')}} </a>
          </div>
          <div id="label_qr_code" class="collapse">
            <div class="card-body">
              <div id="qr_code_image" class="text-center"></div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header p-1">
            <a class="btn btn-sm" data-toggle="collapse" href="#label_change_password">{{labels.get('label_change_password')}} </a>
          </div>
          <div id="label_change_password" class="collapse">
            <form :id="taskData.formSaveChangePassword">
              <div class="card-body">
                <InputTemplate :inputItems="item.inputFieldsPassword" />
                <div class="row mb-2">
                  <div class="col-4">
                  </div>
                  <div class="col-4">
                    <button type="button" class="mr-2 mb-2 btn btn-sm bg-gradient-primary" @click="savePassword()"><i class="feather icon-save"></i> {{labels.get('label_save')}}</button>
                  </div>
                  <div class="col-4">
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="card">
          <div class="card-header p-1">
            <a class="btn btn-sm" data-toggle="collapse" href="#label_profile_picture">{{labels.get('label_profile_picture')}} </a>
          </div>
          <div id="label_profile_picture" class="collapse show">

            <form :id="taskData.formSaveProfilePicture">
              <div class="card-body">
                <InputTemplate :inputItems="item.inputFieldsProfilePicture" />
                <div class="row mb-2">
                  <div class="col-4">
                  </div>
                  <div class="col-4">
                    <button type="button" class="mr-2 mb-2 btn btn-sm bg-gradient-primary" @click="saveProfilePicture()"><i class="feather icon-save"></i> {{labels.get('label_save')}}</button>
                  </div>
                  <div class="col-4">
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script setup>
  import globalVariables from "@/assets/globalVariables";
  import systemFunctions from "@/assets/systemFunctions";
  import toastFunctions from "@/assets/toastFunctions";
  import labels from '@/labels'
  import {onMounted, reactive} from 'vue'
  import {useRouter} from 'vue-router';
  import axios from 'axios';
  import InputTemplate from '@/components/InputTemplate.vue';
  let taskData=reactive({
    api_url:'/user',
    formSaveProfilePicture:'formSaveProfilePicture',
    formSaveChangePassword:'formSaveChangePassword',
  })
  labels.add([{language:globalVariables.language,file:'tasks'+taskData.api_url+'/profile/labels.js'}])
  let item=reactive({
    id:0,
    exists:true,
    inputFieldsPassword:{},
    inputFieldsProfilePicture:{},
    data:{
      id:0,
      password_old:'',
      password_new:'',
    }
  })
  const router =useRouter()

  const setInputFieldsPassword=()=> {
    let inputFields = {}
    let key = 'save_token';
    inputFields[key] = {
      name: key,
      label: labels.get('label_' + key),
      type: 'hidden',
      default: new Date().getTime(),
      mandatory: true
    };
    key = 'password_old';
    inputFields[key] = {
      name: 'item[' +key +']',
      label: labels.get('label_' + key),
      type: 'password',
      default: item.data[key],
      mandatory: true
    };
    key = 'password_new';
    inputFields[key] = {
      name: 'item[' +key +']',
      label: labels.get('label_' + key),
      type: 'password',
      default: item.data[key],
      mandatory: true
    };
    item.inputFieldsPassword=inputFields;
  }
  const setInputFieldsProfilePicture=async ()=> {
    item.inputFieldsProfilePicture= {};
    await systemFunctions.delay(1)//wait for clear
    let inputFields = {}
    let key = 'save_token';
    inputFields[key] = {
      name: key,
      label: labels.get('label_' + key),
      type: 'hidden',
      default: new Date().getTime(),
      mandatory: true
    };
    key='profile_picture';
    inputFields[key] = {
      name: 'item[' +key +']',
      label: labels.get('label_'+key),
      type:'image',
      default:globalVariables.user.profile_picture,
      mandatory:true
    };
    item.inputFieldsProfilePicture=inputFields;
  }
  const savePassword=async ()=>{
    let formData=new FormData(document.getElementById(taskData.formSaveChangePassword))
    await axios.post(taskData.api_url+'/change-password',formData).then((res)=>{
      if (res.data.error == "") {
        toastFunctions.showSuccessfullySavedMessage()
        globalVariables.logout();
      }
      else{
        toastFunctions.showResponseError(res.data)
      }
    });
  }
  const saveProfilePicture=async ()=>{

    let saveData=false;
    let fileFormData=await systemFunctions.getImageFormData(taskData.formSaveProfilePicture);
    if(systemFunctions.isFormDataEmpty(fileFormData)){
      //saveData=true;
      toastFunctions.showErrorMessage(labels.get("Profile Image not attached"))
    }
    else{
      globalVariables.uploadingFiles=1;
      fileFormData.set('upload_dir','profile-pictures/'+globalVariables.user.id)
      //fileFormData.set('type','file')//if not image
      //fileFormData.set('max_size','10240')//if needed more than 3mb
      await axios.post(globalVariables.baseURLUploadServer+'/upload',fileFormData).then((res)=>{
        if (res.data.error == "") {
          let uploadData = res.data.uploaded_files;
          for(let key in uploadData){
            $('#'+key+'_file_input').val(uploadData[key].path)
          }
          saveData=true;
        }
        else{
          toastFunctions.showResponseError(res.data)
        }
      });
    }
    if(saveData){
      await systemFunctions.delay(1);//to confirm input is set
      let formData=new FormData(document.getElementById(taskData.formSaveProfilePicture))
      await axios.post(taskData.api_url+'/profile-picture',formData).then((res)=>{
        if (res.data.error == "") {
          toastFunctions.showSuccessfullySavedMessage()
          globalVariables.user.profile_picture=$('#profile_picture_file_input').val();
          setInputFieldsProfilePicture();
        }
        else{
          toastFunctions.showResponseError(res.data)
        }
      });
    }
  }
  if(!(globalVariables.user.id>0)){
    router.push("/login")
  }
  else{
    onMounted(() => {
      $('#qr_code_image').qrcode(
          {
            size:200,
            text: globalVariables.user.name,
            render	: "image"
          }
      );
    })
    setInputFieldsPassword();
    setInputFieldsProfilePicture()
  }
</script>
