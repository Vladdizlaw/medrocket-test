<template>
    <div class="item_wrap">
        {{ props}} 
        
    </div>
</template>
<script setup>
import { defineProps } from "vue"
const props = defineProps({
    title:String,
    id:Number,
    isOpened:Boolean,
   
})

</script>
<style scoped>
.item_wrap{
    padding:1rem 1rem;
    cursor: pointer;
    z-index:10;
    border: 1px solid black;
}
</style>
