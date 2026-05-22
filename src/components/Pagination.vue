<template>
    <div class="row d-print-none">
        <div class="col">
            <label>{{labels.get('label_per_page')}}</label>
            <select class="select-pagination" v-model="pagination.per_page" @change="pagination.current_page=1;onChangePageOption(pagination)">
                <option v-for="(option, index) in pagination.per_page_options" :key="index" :value="option">{{ option }}</option>
                <option v-if="pagination.show_all_items" :value="-1">{{labels.get('label_all_items')}}</option>
            </select>
        </div>
        <div class="col" v-if="items.total>0">
            <label>{{labels.get('label_showing')}}: </label>
            <label v-if="items.to">{{items.from}}-{{items.to}} </label>
            <label v-else>0-0 </label>
             of {{items.total}}
        </div>
        <div class="col" v-else>
            <label>{{labels.get('label_showing')}}: </label>            
            <label> 0-0 </label>
             of {{items.total}}
        </div>
        
        <div class="col text-right">
            <button class="btn-pagination" @click.prevent="--pagination.current_page;onChangePageOption(pagination)" :disabled="items.current_page < 2">{{labels.get('label_previous')}}</button>
            <label>{{labels.get('label_go_page')}}</label>
            <select v-model="pagination.current_page" class="select-pagination" @change="onChangePageOption(pagination)">
                <option v-for="(n, index) in items.last_page" :key="index" :value="n">{{ n }}</option>
            </select>
            <button class="btn-pagination" @click.prevent="++pagination.current_page;onChangePageOption(pagination)" :disabled="items.current_page >= items.last_page">{{labels.get('label_next')}}</button>
        </div>
        
    </div>
</template>
<script setup>
import labels from '@/labels'
    const props=defineProps({
        items: Object,
        onChangePageOption: {
            type: Function,
            default: ()=> (console.log('Default on onChange PageOption called'))
        },      
        pagination: {
            type: Object,
            default() {
                return {current_page: 1,per_page_options: [10,20,50,100],per_page:20,show_all_items:false}
            }
        }
    })
</script>

<style  scoped>
button.btn-pagination {
    border: 1px solid;
    border-radius: 12px;
    padding: 3px 10px;
    font-size: 13px;
    margin: 0 5px 0 5px;
    background: linear-gradient(243deg, #5951bf, #873fc3);
    color: #fff;
    font-weight: 500;
}

button:disabled,
button[disabled]{
  border: 1px solid #999999;
  background: #cccccc;
  color: #666666;
}
select.select-pagination{
    border: 1px solid #b5b5b5;
    border-radius: 11px;
    padding: 3px 2px 3px 5px;
    font-size: 11px;
    margin-left: 6px;
    background: #f8f3ff;
}
</style>
