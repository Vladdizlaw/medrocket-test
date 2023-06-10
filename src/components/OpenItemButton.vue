<script setup>
import { defineProps } from "vue"
const props = defineProps({
    isOpened: Boolean,
})
</script>
<template>
    <div class="btn_wrap">
        <div class="btn_symbol">
            <div class="lineH"></div>
            <div v-if="!props.isOpened" class="lineV"></div>
        </div>
    </div>
</template>
<style scoped>
.btn_wrap {
    background: #117DC1;
    border-radius: 50%;
    height: 1.5rem;
    width: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn_symbol {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 80%;
    position: relative;
}

.lineH {
    position: absolute;
    left: 50;
    top:50;
    height: 2px;
    background: white;
    width: 50%
}

.lineV {
    position: absolute;
    left: 50;
    top:50;
    width: 2px;
    background: white;
    height: 50%
}
</style>