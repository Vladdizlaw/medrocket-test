<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({photo:Object})

</script>
<template>
    <div class="photo-container">
        <!-- {{ props.photo}} -->
    </div>
</template>
<style scoped>
.photo-container{
    width:10rem;
    height:10rem;
    border: 1px solid black;
}
</style>