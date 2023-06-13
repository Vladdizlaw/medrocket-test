<script setup>
import { defineProps, defineEmits } from 'vue';
import closeButton from './closeButton.vue';
const props = defineProps({
    url: String,
})
const emit = defineEmits(['close-modal'])
</script>
<template>
    <div class="modal-wrapper" >
        <close-button class="modal-close" @click.native.stop="emit('close-modal')" />
        <img :src="props.url" width="50%" height="90%" load="lazy"/>
    </div>
</template>
<style scoped >
.modal-wrapper {
    width: 100%;
    height: 100%;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.47);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    user-select: none;
}

.modal-close {
    z-index: 100;
    position: absolute;
    top: 2rem;
    right: 2rem;
    width: 1.5rem;
    height: 1.5rem;
    padding:0.2rem;
}
.modal-close:hover{
    border-radius:5px;
   
    background-color: rgba(0, 0, 0, 0.3);
}
</style>