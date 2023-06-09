<script setup>
import OpenItemButton from './OpenItemButton.vue';
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
<template>
    <div class="user_wrap">
        <open-item-button :isOpened="state.isOpened" />
        {{ props.title }}

    </div>
</template>
<style scoped>
.user_wrap{
   
    font-family: 'Roboto';
font-style: normal;
font-weight: 500;
font-size: 22px;
line-height: 130%;
    min-height:2rem;
    min-width:2rem;
}
</style>