<template>
  <div class="row mb-2">
    <div class="col-4">
      <label class="font-weight-bold float-right">{{inputItem.label}} <span class="text-danger" v-if="inputItem.mandatory">*</span></label>
    </div>
    <div class="col-lg-4 col-8">
      <label :id="inputKey" class="text-muted" v-html="inputItem.default"></label>
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