<template>
  <div class="row mb-2">
    <div :class="inputItem.col_class_label?inputItem.col_class_label:'col-4'" v-if="inputItem.label || inputItem.col_class_label">
      <label class="font-weight-bold float-right">{{inputItem.label}}</label>
    </div>
    <div :class="inputItem.col_class_input?inputItem.col_class_input:(inputItem.label || inputItem.col_class_label)?'col-lg-4 col-8':'col-12'">
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