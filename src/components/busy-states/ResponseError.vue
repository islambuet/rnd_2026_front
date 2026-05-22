<template>
    <div class="card shadow px-4 py-4">
        <div class="row d-flex align-items-center justify-content-center mb-1">
            <div class="col-8 text-center">
                <img :src="globalVariables.baseUrl+'theme/images/loading-failed.png'" alt="">
            </div>
        </div>
        <div class="row d-flex align-items-center justify-content-center mb-2">
            <div class="col-8 text-center">
            <h4>{{labels.get('msg_server_error_title')}}</h4>
            </div>
        </div>
        <div class="row d-flex align-items-center justify-content-center ">
            <div class="col-8 text-center">
            <div>{{labels.get('msg_server_error_message')}}</div>
            <button @click.prevent="reloadPage" class="btn btn-danger">{{labels.get('label_refresh')}}</button>
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
    </script>
<style  scoped>
.card{
  background: #ffd0d0;
}
</style>