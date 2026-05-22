<template>
  <div class="row mb-2">
    <div class="col-4">
      <label class="font-weight-bold float-right">{{inputItem.label}}</label>
    </div>
    <div class="col-lg-4 col-8">
      <small :id="inputKey" class="form-text text-muted" v-html="inputItem.default"></small>
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