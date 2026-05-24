<template>
  <div class="row mb-2">
    <div :class="inputItem.col_class_label?inputItem.col_class_label:'col-4'" v-if="inputItem.label || inputItem.col_class_label">
      <label class="font-weight-bold float-right">{{inputItem.label}} <span class="text-danger" v-if="inputItem.mandatory">*</span></label>
    </div>
    <div :class="inputItem.col_class_input?inputItem.col_class_input:(inputItem.label || inputItem.col_class_label)?'col-lg-4 col-8':'col-12'">
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