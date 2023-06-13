<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({ photo: Object })

</script>
<template>
    <div class="photo-container">
        <img :src="props.photo.thumbnailUrl" class="thumbnail" alt="photo" />
        <div class="tooltip">{{ props.photo.title }}</div>
        <div class="slot-container">
            <slot></slot>
        </div>
    </div>
</template>
<style scoped>
.photo-container {
    width: 150px;
    height: 150px;
    position: relative;
    cursor: pointer;
}

.thumbnail {
    width: 100%;
    height: 100%;
}


.tooltip {
    background: rgba(0, 0, 0, 0.69);
    border-radius: 4px;
    color: white;
    display: none;
    position: absolute;
    bottom: -10%;
    left: 36%;
    right: -20%;
    font-size: 0.9rem;
    padding: 0.5rem;

}

.thumbnail:hover+.tooltip {
    display: flex;
    min-width: 5rem;
}

.slot-container {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;

}
</style>