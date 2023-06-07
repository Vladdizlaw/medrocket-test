<template>
  <div class="fav-wrap">
    <img alt="Vue logo" src="../assets/logo.png">
{{ state }}
  </div>
</template>

<script setup>
import { reactive } from "vue"
const state = reactive({
  number:1
})
</script>

