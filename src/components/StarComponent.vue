<script setup>
import starFull from './starFull.vue';
import starEmpty from './starEmpty.vue';
import { defineProps } from 'vue'
const props = defineProps({ isFavorited: Number });
</script>
<template>
<div class="start-container">
    <star-empty class="star" v-if="props.isFavorited==-1"/>
    <star-full class="star" v-else/>
  
</div>
</template>
<style scoped>
.start-container {
    width: 2rem;
    height: 2rem;
    border-radius:50%;
    background-color: white;
    display:flex;
    align-items:center;
    justify-content: center;
}
.star{
    width:70%;
    height: 70%;
}
</style>