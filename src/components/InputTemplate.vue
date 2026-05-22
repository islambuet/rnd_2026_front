<template>
    <template  v-for="(inputItem, key) in inputItems" :key="key">
      <template v-if="inputItem.type=='hidden'">
        <input type="hidden" :id="key" :name="inputItem.name" :value="inputItem.default" />
      </template>
      <template v-else-if="inputItem.type=='textarea'">
        <input-template-textarea :input-item="inputItem" :input-key="key"/>
      </template>
      <template v-else-if="inputItem.type=='dropdown'">
        <input-template-dropdown :input-item="inputItem" :input-key="key"/>
      </template>
      <template v-else-if="inputItem.type=='checkbox'">
        <input-template-checkbox :input-item="inputItem" :input-key="key"/>
      </template>
      <template v-else-if="['image','file'].includes(inputItem.type)">
        <input-template-file :input-item="inputItem" :input-key="key"/>
      </template>
      <template v-else-if="inputItem.type=='hint'">
        <input-template-hint :input-item="inputItem" :input-key="key"/>
      </template>
      <template v-else-if="inputItem.type=='textonly'">
        <input-template-textonly :input-item="inputItem" :input-key="key"/>
      </template>
      <template v-else>
        <input-template-default :input-item="inputItem" :input-key="key"/>
      </template>
    </template>
</template>
<script setup>
    import globalVariables from "@/assets/globalVariables";
    import systemFunctions from "@/assets/systemFunctions";
    import toastFunctions from "@/assets/toastFunctions";
    import labels from '@/labels'   

    import InputTemplateDefault from '@/components/InputSubTemplates/Default.vue';
    import InputTemplateTextarea from '@/components/InputSubTemplates/Textarea.vue';
    import InputTemplateDropdown from '@/components/InputSubTemplates/Dropdown.vue';
    import InputTemplateCheckbox from '@/components/InputSubTemplates/Checkbox.vue';
    import InputTemplateFile from '@/components/InputSubTemplates/File.vue';
    import InputTemplateHint from '@/components/InputSubTemplates/Hint.vue';
    import InputTemplateTextonly from '@/components/InputSubTemplates/Textonly.vue';

    const props=defineProps({
        inputItems: {
            type: Object,
            required: true
        },        
        
    })

    
</script>


