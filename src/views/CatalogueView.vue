<template>
  <div class="cat_wrap" v-if="state.users"  >
    <div v-for="item in state.users" :key="item.id">
    <ItemsComponent  :id="item.id"
      :title="item.name" :isOpened="state.openedUsers.includes(item.id)"  @click.native="onClickItem(item.id)"/>

      <div v-if="state.albums&&state.openedUsers.includes(item.id)">
        <div v-for="item in state.albums" :key="item.id">
          <ItemsComponent  :id="item.id"
      :title="item.title" :isOpened="state.openedAlbums.includes(item.id)"  />
        </div>
       
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, onBeforeMount } from "vue"
import api from "@/api"
import ItemsComponent from "@/components/ItemsComponent.vue"
onBeforeMount(async () => {
  await api.getUsers().then((users) => {
    state.users = users
  })
})
const onClickItem = async (id) => {
  const itemIndex = state.openedUsers.findIndex((el)=>el==id)
  if (itemIndex == (-1)) {
    state.openedUsers.push(id)
    await api.getAlbums(id).then((albums) => {
    state.albums = albums
  })
  } else {
    state.openedUsers.splice(itemIndex, 1)
  }
}
const state = reactive({
  users: [],
  albums:[],

  openedUsers: [],
  openedAlbums: [],

})

</script>
<style scoped>
.cat_wrap {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  min-width:10rem;
  min-height:10rem;
}
</style>
