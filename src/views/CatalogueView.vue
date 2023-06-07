<template>
  <div class="about">
    <h1>{{ state }}</h1>
  </div>
</template>
<script setup>
import { reactive, onBeforeMount } from "vue"
import api from "@/api"

onBeforeMount(async () => {
       await api.getUsers().then((users) => {
        state.users = users
       })
})
const state = reactive({
 users: [],

})
</script>
