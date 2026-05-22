<template>
    <div class="d-print-none position-absolute" :style="position" style="top: calc(50% - 24px );">                                            
        <div @click="sortClicked('asc')"><i type="button" class="bi bi-sort-up-alt text-primary mr-2" :class="ascActive"></i></div>
        <div @click="sortClicked('desc')"><i type="button" class="bi bi-sort-down text-primary mr-2" :class="descActive"></i></div>                                            
    </div>
</template>

<script>
export default { 
    name: "ColumnSort",    
    props: {
        columns: {
            type: Object,
            required: true
        },
        sortKey: {
            type: String,
            required: true
        },
        position: {
            type: String,
            default:'left:5px'
            
        },
        onChangeSort: {
            type: Function,
            default: ()=> (console.log('default on sort Filter called'))            
        },
    }, 
    data:function(){
        return{
            // ascActive:'text-primary',
            // descActive:'text-primary'
        }
        
    },
    computed: {
        ascActive(){
            if((this.columns.sort.key==this.sortKey)&&(this.columns.sort.dir=='asc')){
                return 'text-danger';
            }
            return 'text-primary';
        },
        descActive(){
            if((this.columns.sort.key==this.sortKey)&&(this.columns.sort.dir=='desc')){
                return 'text-danger';
            }
            return 'text-primary';
        }
    },    
    methods:{
        sortClicked(dir){
            if(this.columns.sort.key==this.sortKey){
                if(dir==this.columns.sort.dir){
                    this.columns.sort.key='';
                    this.columns.sort.dir=''; 
                }
                else{
                    this.columns.sort.dir=dir; 
                }
            }
            else{
                this.columns.sort.key=this.sortKey;
                this.columns.sort.dir=dir; 
            }
            this.onChangeSort();
        }
    }
};
</script>