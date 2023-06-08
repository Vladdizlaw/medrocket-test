<template>
    <div class="item_wrap">
       <input type="checkbox" v-model="state.isOpened"/>  
        {{ props}}
    </div>
</template>
<script setup>
import { defineProps, reactive } from "vue"
const props = defineProps({
    title:String,
    id:Number,
    isOpened:Boolean,
   
})
const state =reactive({
    isOpened: props.isOpened
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
