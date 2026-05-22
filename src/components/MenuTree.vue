<template>
  <li :class="(menu.type=='TASK')?'system_task_link':''">
    <a v-if="menu.type=='MODULE'" :href="'#'+item_id_prefix+menu.id" data-toggle="collapse" aria-expanded="false">      
      <i class="bi bi-pentagon-fill"></i> {{getName(menu)}}<span class="fe-menu-arrow"></span>
    </a>    
    <router-link v-else :to="'/'+menu.url">
      <i class="bi bi-life-preserver"></i> {{ getName(menu)}}
    </router-link>    
     <ul :id="item_id_prefix+menu.id" class="list-unstyled collapse" v-if="menu.children && menu.children.length">
      <menu-item v-for="child in menu.children" :key="child.id" :menu="child"></menu-item>
    </ul>
  </li>
</template>
<script setup>
  import globalVariables from "@/assets/globalVariables";
  import menuLabels from "@/labels/menu.js"
  const getName=(menu)=>{
    return menuLabels[menu.name] ? (menuLabels[menu.name][globalVariables.language]?menuLabels[menu.name][globalVariables.language]: menu.name) : menu.name;
    //return menu.name;
  }
</script>

<script> 
  
  
export default { 
  name: "menuItem",   
  props: {
    menu:Object,  
    item_id_prefix:
      {
        type:String ,
        default:'side_menu_'
      }
  },
  
};
</script>
<style scoped>
.tree-list ul {
  padding-left: 16px;
  margin: 6px 0;
}
</style>