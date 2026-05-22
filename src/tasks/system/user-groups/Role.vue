<template>
  <div class="card d-print-none mb-2">
    <div class="card-body">
      <router-link :to="taskData.api_url" class="mr-2 mb-2 btn btn-sm bg-gradient-primary" ><i class="feather icon-corner-up-left"></i> {{labels.get('label_back')}}</router-link>
    </div>
  </div>
  <div class="accordion mb-2" v-if="item.exists">
    <div class="card" v-for="task in taskData.tasks.tasksTree">
      <div class="card-header p-1">
        <a class="btn btn-sm" data-toggle="collapse" :href="'#root_module_'+task.id">{{task.name}}</a>
      </div>
      <div :id="'root_module_'+task.id" class="collapse">
        <div class="card-body" style='overflow-x:auto'>
          <form :id="'form_save_task_'+task.id">
            <table class="table table-sm table-bordered">
              <thead class="table-active">
                <tr>
                  <th :colspan="taskData.tasks.max_level"><small> {{labels.get('label_task_name')}}</small></th>
                  <th v-for="(n,i) in taskData.max_task_actions">
                    <label><input type="checkbox" :data-type="'header_action_'+i+'_'+task.id" class="header_action"><small> {{labels.get('action_'+i)}}</small></label>
                  </th>
                </tr>
              </thead>
              <tbody class="table-striped table-hover">
                <tr v-for="subTask in getSubTasks(task)">
                  <td v-for="i in taskData.tasks.max_level">
                    <label v-if="subTask.level==i">
                      <input type="hidden" :name="'tasks['+subTask.id+'][task_id]'" :value="subTask.id" v-if="subTask.type=='TASK'" />
                      <input type="checkbox" :data-id="subTask.id"  :class="'task_action '+subTask.parent_class" />
                      <small>&nbsp;{{subTask.name}}</small>
                    </label>
                  </td>
                  <td v-for="(n,i) in taskData.max_task_actions">
                    <label v-if="subTask.type=='TASK'">
                      <input type="checkbox"
                        :class="'header_action_'+i+' header_action_'+i+'_'+task.id+' '+subTask.parent_class+' '+'parent_'+subTask.id"
                        :checked="item.data['action_'+i].indexOf(','+subTask.id+',')>=0"
                        :name="'tasks['+subTask.id+'][actions]['+i+']'"
                        value="1"
                      />
                      {{labels.get('action_short_'+i)}}
                    </label>
                  </td>

                </tr>
              </tbody>
              <tfoot>
              <tr>
                <td colspan="15" class="text-center">
                  <button @click="saveRole('form_save_task_'+task.id)" type="button" class="btn btn-sm bg-gradient-success">{{labels.get('label_save')}}</button>
                </td>
              </tr>
              </tfoot>
            </table>
          </form>
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

import {useRouter} from "vue-router";
import {inject, onMounted, reactive} from "vue";
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
  data:{
    id:0,
    name:'',
    ordering:99,
    status:'Active',
  }
})
const getSubTasks=(task)=>{
  let items=[]
  items.push(task);
  if(task.children){
    for(let i=0;i<task.children.length;i++){
      let subTask=getSubTasks(task.children[i]);
      for(let j=0;j<subTask.length;j++){
        items.push(subTask[j]);
      }
    }
  }
  return items;
}
const saveRole=async (form_id)=>{
  let formData=new FormData(document.getElementById(form_id))
  await axios.post(taskData.api_url+'/save-role/'+item.id,formData).then((res)=>{
    if (res.data.error == "") {
      globalVariables.loadListData=true;
      toastFunctions.showSuccessfullySavedMessage();
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
      item.exists=true;
    }
    else{
      toastFunctions.showResponseError(res.data)
    }
  });
}
  item.id=route.params['item_id']?route.params['item_id']:0;
  if(!(taskData.permissions.action_2)){
    toastFunctions.showAccessDenyMessage();
  }
  else{
    onMounted(() => {
      $(document).ready(function()
      {
        $(document).off("click", ".header_action");
        $(document).on("click",'.header_action',function()
        {
          if($(this).is(':checked'))
          {
            $('.'+$(this).attr('data-type')).prop('checked', true);
          }
          else
          {
            $('.'+$(this).attr('data-type')).prop('checked', false);
          }
        });
        $(document).off("click", ".task_action");
        $(document).on("click",'.task_action',function()
        {

          if($(this).is(':checked'))
          {
            $('.parent_'+$(this).attr('data-id')+':not(.header_action_3,.header_action_7)').prop('checked', true);
            //$('.parent_'+$(this).attr('data-id')).prop('checked', true);
            //$('.parent_'+$(this).attr('data-id')+':not(.header_action_3)').prop('checked', true);
            //$('.parent_'+$(this).attr('data-id')+':not(.header_action_3,.header_action_7,.header_action_8)').prop('checked', true);
          }
          else
          {
            $('.parent_'+$(this).attr('data-id')).prop('checked', false);
          }
        });
      });
    })
    getItem();
  }
</script>