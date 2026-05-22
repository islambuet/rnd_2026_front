<template>
  <div v-if="taskData.permissions.action_0==1">
    <div v-show="taskData.method=='list'" v-if="!globalVariables.loadListData">
      <List/>
    </div>
    <div v-if="taskData.method=='add'">
      <AddEdit/>
    </div>
    <div v-if="taskData.method=='edit'">
      <AddEdit/>
    </div>
    <div v-if="taskData.method=='details'">
      <Details/>
    </div>
  </div>
</template>
<script setup>
  import globalVariables from "@/assets/globalVariables";
  import systemFunctions from "@/assets/systemFunctions";
  import toastFunctions from "@/assets/toastFunctions";
  import labels from '@/labels'
  import {provide, reactive, watch} from 'vue'
  import {useRoute,useRouter} from 'vue-router';
  import axios from 'axios';

  import List from './List.vue'
  import AddEdit from './AddEdit.vue'
  import Details from './Details.vue'
  import SystemFunctions from "@/assets/systemFunctions";

  globalVariables.loadListData=true;
  const route =useRoute()
  const router =useRouter()

  let taskData=reactive({
    api_url:systemFunctions.getTaskBaseURL(import.meta.url),
    method:'',

    permissions:{},
    item: {},           //single item
    items: {max_level:1,tasksTree:[]},   //here items==modules_tasks
    itemsFiltered: [],    //for display
    columns:{all:{},hidden:[],sort:{key:'',dir:''}},
    // pagination: {current_page: 1,per_page_options: [10,20,50,100,500,1000],per_page:-1,show_all_items:true},
  })
  labels.add([{language:globalVariables.language,file:'tasks'+taskData.api_url+'/labels.js'}])

  const routing=async ()=>{
    await getItems();//Load at least once
    if(route.path==taskData.api_url){
      taskData.method='list';
    }
    else if(route.path==taskData.api_url+'/add'){
      taskData.method='add';
    }
    else if(route.path.indexOf(taskData.api_url+'/edit/')!=-1)
    {
      taskData.method='edit';
    }
    else if(route.path.indexOf(taskData.api_url+'/details/')!=-1)
    {
      taskData.method='details';
    }
  }
  watch(route, () => {
    routing();
  })


  const getItems=async()=>{
    if(globalVariables.loadListData)
    {
      await axios.get(taskData.api_url+'/get-items')
          .then(res => {
            if(res.data.error==''){
              taskData.items= res.data.items;
              taskData.setFilteredItems();
            }
            else{
              toastFunctions.showResponseError(res.data)
            }
            globalVariables.loadListData=false;
          })
    }
  }
  taskData.setFilteredItems=()=>{
    taskData.itemsFiltered=getListItemsFromTree(taskData.items.tasksTree);
  }
  const getListItemsFromTree=(tree)=>{
    let items=[];
    for(let i=0;i<tree.length;i++)
    {
      let item=tree[i];
      for(let level=1;level<=taskData.items.max_level;level++) {
        if (level == item.level) {
          item['name_' + level] = item['name'];
        } else {
          item['name_' + level] = '';
        }
      }
      items.push(item);
      if(item.children){
          let subItems = getListItemsFromTree(item.children);
          for (let z = 0; z < subItems.length; z++) {
            items.push(subItems[z])
          }
      }
    }
    return items
  }
  taskData.reloadItems=()=>{
    globalVariables.loadListData=true;
    getItems();
  }
  const init=async ()=>{
    await axios.get(taskData.api_url+'/initialize').then((res)=>{
      if (res.data.error == "") {
        taskData.permissions=res.data.permissions;
        if(res.data.hidden_columns){
          taskData.columns.hidden=res.data.hidden_columns;
        }
        routing();
      }
      else{
        toastFunctions.showResponseError(res.data)
      }
    });
  }
  provide('taskData',taskData)
  if(!(globalVariables.user.id>0)){
    router.push("/login")
  }
  else{
    init();
  }
</script>
