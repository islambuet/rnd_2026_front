<template>
      <Header/>
      <SidebarLeft/>
      <div id="system_content">                    
        <router-view/>
      </div>
</template>
<script setup>
  import Header from "./Header.vue";
  import SidebarLeft from "./SidebarLeft.vue";
</script>