<template>    
    <div class="card px-4 py-4">
        <div class="row d-flex align-items-center justify-content-center mb-1">
            <div class="col-8 text-center">
                <img :src="globalVariables.baseUrl+'theme/images/deny.png'" alt="">
            </div>
        </div>
        <div class="row d-flex align-items-center justify-content-center mb-2">
            <div class="col-8 text-center">
            <h2>{{labels.get('msg_access_deny_title')}}</h2>
            </div>
        </div>
        <div class="row d-flex align-items-center justify-content-center ">
            <div class="col-8 text-center">
              <div>{{labels.get('msg_access_deny_message')}}</div>
              <button @click.prevent="reloadPage" class="btn btn-danger">{{labels.get('label_refresh')}}</button>
              <button @click.prevent="goHome" class="btn btn-outline-primary ml-1">Go {{labels.get('label_dashboard')}}</button>
            </div>
        </div>
    </div>    
</template>
<script setup>
    import globalVariables from "@/assets/globalVariables";
    import labels from '@/labels'
    const reloadPage=()=>{
        window.location.reload();
    }
    const goHome=()=>{
      window.location.replace(globalVariables.baseUrl);
    }
  </script>

<style  scoped>
.card{
    background: #ffd0d0;
}
</style>