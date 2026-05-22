<template>
    <div class="card shadow px-4 py-4">
        <div class="row d-flex align-items-center justify-content-center mb-1">
            <div class="col-8 text-center">
                <img :src="globalVariables.baseUrl+'theme/images/offline.png'" alt="">
            </div>
        </div>
        <div class="row d-flex align-items-center justify-content-center mb-2">
            <div class="col-8 text-center">
            <h2>{{labels.get('msg_site_offline_title')}}</h2>
            </div>
        </div>
        <div class="row d-flex align-items-center justify-content-center ">
            <div class="col-8 text-center">
                <div>{{labels.get('msg_site_offline_message')}}</div>
                <button @click.prevent="reloadPage" class="btn btn-danger">{{labels.get('label_refresh')}}</button>
            </div>
        </div>
    </div>
</template>

<script setup>
  import globalVariables from "@/assets/globalVariables";
  import labels from '@/labels'
  console.log(labels)
  const reloadPage=()=>{
    window.location.reload();
  }
</script>

<style  scoped>
.card{
    background: #ffd0d0;
}
.box {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #ffffff;
        height: 100vh;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99999;
    }
</style>