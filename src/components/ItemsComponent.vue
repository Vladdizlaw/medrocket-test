<script setup>
import OpenItemButton from './OpenItemButton.vue';
import { defineProps } from "vue"
const props = defineProps({
    title: String,
    id: Number,
    isOpened: Boolean,

})

</script>
<template>
    <div class="user_wrap">
    
        <open-item-button :isOpened="props.isOpened" />
        <p>{{ props.title }}</p>   
    </div>
</template>
<style scoped>
.user_wrap {
    display: flex;
    flex-wrap: nowrap;
    justify-content: start;
    align-items: center;
    white-space: nowrap;
    gap: 1.5rem;
    line-height: 0%;
    /* max-width: fit-content; */
    cursor: pointer;
}
</style>