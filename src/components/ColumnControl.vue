<template>
    <div class="card d-print-none mb-2">
        <div class="card-body">            
            <div class="row">
                <template v-for="(column, key) in columns.all">
                    <div class="col-sm-6 col-md-3" :key="'cc_'+key" v-if="column.hideable">                                                
                        <label><input type="checkbox" :value="key" :checked="columns.hidden.indexOf(key)<0" @change="toggleControlColumns($event)" > {{column.label}}</label>
                    </div>
                </template>
            </div>
            <div class="text-center" v-if="allow_save">
                <button type="button" class="btn btn-sm bg-gradient-primary" @click="saveHiddenColumns"><i class="feather icon-save"></i> {{labels.get('label_save_column_controls')}}</button>
            </div>
        </div>
    </div>
</template>
<script setup>
    import toastFunctions from "@/assets/toastFunctions";
    import labels from '@/labels'

    import axios from 'axios';
    const props=defineProps({
        columns: {
            type: Object,
            required: true
        },        
        allow_save:{
            type: Boolean,
            default:true
        },
        url: {
            type: String,
            required: true
        },
        method: {
            type: String,
            default: 'list'
            
        },
    })
    const toggleControlColumns=(event)=>{
        let key=event.target .value;
        if(event.target .checked){
            props.columns.hidden=props.columns.hidden.filter(function(value) {return value !== key});
        }
        else{
            props.columns.hidden.push(key);
        }    
    }
    const saveHiddenColumns=()=>
    {
        let form_data=new FormData();
        form_data.append ('url', props.url);
        form_data.append ('method', props.method);
        for(let i=0;i<props.columns.hidden.length;i++){
            form_data.append ('hidden_columns[]', props.columns.hidden[i]);
        }
        axios.post('/columns-control/save-item',form_data)
        .then(res => {
            if(res.data.error==''){
                toastFunctions.showSuccessfullySavedMessage()
            }
            else{
              toastFunctions.showResponseError(res.data)
            }
        });
    }
</script>


