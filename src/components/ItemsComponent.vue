<template>
    <div>
        {{ props}}, {{state }}
        
    </div>
</template>
<script setup>
import { reactive, defineProps } from "vue"
const props = defineProps({
    title:String,
    Id:String,
   
})
const state = reactive({
 isOpened:false,

 
})
</script>
