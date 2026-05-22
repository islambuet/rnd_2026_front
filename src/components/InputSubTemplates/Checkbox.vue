<template>
  <div class="row mb-2">
    <div class="col-4">
      <label class="font-weight-bold float-right">{{inputItem.label}} <span class="text-danger" v-if="inputItem.mandatory">*</span></label>
    </div>
    <div class="col-lg-4 col-8">
        <div class="form-check" :class="inputItem.inline?' form-check-inline':''" v-for="(option, i) in inputItem.options">
          <input class="form-check-input" type="checkbox" :id="inputKey+'_'+i" :value="option.value" :name="inputItem.name+'[]'" :checked="inputItem.default.includes(option.value)">
          <label class="form-check-label" :for="inputKey+'_'+i">{{option.label}}</label>
        </div>
    </div>
  </div>
</template>
<script setup>
    import { onMounted } from 'vue'
    import labels from '@/labels'
    const props=defineProps({
        inputItem: {
            type: Object,
            required: true
        },
        inputKey: {
          type: String,
          required: true
        },
    })
</script>


