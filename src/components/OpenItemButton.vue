<script setup>
import { defineProps } from "vue"
const props = defineProps({
    isOpened:Boolean, 
})
</script>
<template>
    <div class="btn_wrap">
        <div class="btn_symbol">
            <div class="lineH"></div>
            <div v-if="props.isOpened" class="lineV"></div>
    </div>
    </div>
</template>
<style scoped>
.btn_wrap{
    background: #117DC1;
    border-radius:50%;
    min-height:1rem;
    min-width:1rem;
    max-height:2rem;
    max-width:2rem;
    display:flex;
    justify-content: center;
    align-items: center;
}
.btn_symbol{
    display:flex;
    justify-content: center;
    align-items: center;
    width:80%;
    height:80%;
}

.lineH{
   height:2px;
   background:white;
   width:100%  
}
.lineV{
    width:2px;
   background:white;
   height:100%  
}
</style>