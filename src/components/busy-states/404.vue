<template>
    <div class="col-md-8 col-12 offset-md-2">        
        <div class="text-center">
            <h1 class="error-title">{{labels.get('msg_404_title')}}</h1>
            <p class="fs-5 text-gray-600">{{labels.get('msg_404_message')}}</p>            
            <router-link to="/" :class="'btn btn-lg btn-outline-primary mt-3'">Go {{labels.get('label_dashboard')}}
          </router-link>
        </div>
        <img class="img-error" :src="globalVariables.baseUrl+'theme/images/error-404.png'" alt="Not Found" style="width:100%">
    </div>
</template>
<script setup>
    import globalVariables from "@/assets/globalVariables";
    import labels from '@/labels' 
</script>
