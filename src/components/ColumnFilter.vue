<template>
    <div class="btn-group d-print-none position-absolute" :style="position" style="top: calc(50% - 8px)">
        <i type="button" class="feather icon-search" :class="getFilterClass" data-toggle="dropdown"></i>
        <div class="dropdown-menu dropdown-menu-right" @click.stop>
            <div class="dropdown-item p-1" v-if="column.type=='number'">
                <small>{{labels.get('label_from')}}</small>
                <input type="number" class="form-control form-control-sm float_all" v-model="from" @input="column.filter.from=from;onChangeFilter()"> 
                <small>{{labels.get('label_to')}}</small>
                <input type="number" class="form-control form-control-sm float_all" v-model="to" @input="column.filter.to=to;onChangeFilter()">               
            </div>  
            <div class="dropdown-item p-1" v-if="column.type=='text'">
                <small>{{labels.get('label_search')}}</small>
                <input type="text" class="form-control form-control-sm" v-model="from" @input="column.filter.from=from;onChangeFilter()"> 
            </div>          
            <div class="dropdown-item p-1" v-if="column.type=='dropdown'">  
                <select class="form-control form-control-sm"  v-model="from" @change="column.filter.from=from;onChangeFilter()">  
                    <option value="">{{labels.get('label_select')}}</option>
                    <option v-for="(option, i) in column.filter.options" :key="i" :value="option.value">
                          {{ option.label }}
                      </option>                                  
                  </select>
            </div>      
            <div class="dropdown-item p-1" v-if="column.type=='date'">
                <small>{{labels.get('label_from')}}</small>
                <input type="date" class="form-control form-control-sm" v-model="from" @input="column.filter.from=from;onChangeFilter()"> 
                <small>{{labels.get('label_to')}}</small>
                <input type="date" class="form-control form-control-sm" v-model="to" @input="column.filter.to=to;onChangeFilter()">               
            </div>     
            <div class="dropdown-divider"></div>
            <div class="dropdown-item p-1 text-center">
                <button type="button" class="btn btn-sm bg-gradient-primary" @click="resetFilter()"><i class="feather icon-rotate-cw"></i> {{labels.get('label_reset')}}</button>
            </div>
        </div>
    </div>
</template>
<script setup>

    import labels from '@/labels'  
    import { ref, computed } from 'vue'
    const props=defineProps({
        column: {
            type: Object,
            required: true
        },
        position: {
            type: String,
            default:'right:5px'
            
        },
        onChangeFilter: {
            type: Function,
            default: ()=> (console.log('default on change Filter called'))            
        },
    })
    let from=ref(props.column.filter.from)
    let to=ref(props.column.filter.to)
    const  getFilterClass=computed(()=>{                  
        if((from.value.toString().length>0)||(to.value.toString().length>0)){
                return 'text-danger';
        }
        return 'text-primary';
    })
    const resetFilter=()=>{            
        props.column.filter.from="";
        props.column.filter.to="";
        from.value='';
        to.value='';
        props.onChangeFilter();
    }
</script>

<style scoped>
    .dropdown-item:active {
        background-color: transparent;
    }
</style>