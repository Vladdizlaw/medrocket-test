<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({ photo: Object })

</script>
<template>
    <div class="photo-container">
        <img :src="props.photo.thumbnailUrl" class="thumbnail" alt="photo">
        <!-- {{ props.photo}} -->
        <div class="slot-container">
            <slot></slot>
        </div>
    </div>
</template>
<style scoped>
.photo-container {
    width: 150px;
    height: 150px;
    border: 1px solid black;
    position: relative;
}

.thumbnail {
    width: 100%;
    height: 100%;
}
.slot-container{
   
    position: absolute;
    top:0.5rem;
    right:0.5rem;

}
</style>