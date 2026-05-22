<template>
    <div>
        <section id="description" class="card">
            <div class="card-header">
                <h4 class="card-title">{{ labels.get('label_welcome') }}</h4>
            </div>
            <div class="card-content">
                <div class="card-body">
                    <div class="card-text">
                      {{globalVariables.user.name}}
                    </div>
                </div>
            </div>
        </section>
        <!--/ Description -->
    </div>
</template>
<script setup>
    import globalVariables from "@/assets/globalVariables";
    import systemFunctions from "@/assets/systemFunctions";
    import toastFunctions from "@/assets/toastFunctions";
    import labels from '@/labels'
    import {useRouter} from 'vue-router';
    const router =useRouter()  
    if(!(globalVariables.user.id>0)){
        router.push("/login")
    }    
</script>

