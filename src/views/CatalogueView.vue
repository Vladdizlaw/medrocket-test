<template>
  <div class="cat_wrap" v-if="state.users">
    <div v-for="user,index in state.users" :key="user.id">
      <ItemsComponent :id="user.id" :title="user.name" :isOpened="state.openedUsers.includes(user.id)"
      @click.stop.native="onClickUser(user.id,index)" />

      <div class="nested" v-if="user.albums && state.openedUsers.includes(user.id)">
        <div v-for="album in user.albums" :key="album.id">
          <ItemsComponent :id="album.id" :title="album.title" :isOpened="state.openedAlbums.includes(album.id)"   @click.native.stop="onClickAlbum(album.id,index)" />
          <div  class="nested" v-if="album.photos && state.openedAlbums.includes(album.id)">
        <div v-for="photo in album.photos" :key="photo.id">
          
          <ItemsComponent :id="photo.id" :title="photo.title" :isOpened="state.openedPhotos.includes(photo.id)"   @click.native="onClickPhoto(photo)" />
        </div>
        </div>

      </div>
    </div>
  </div>
  </div>
</template>
<script setup>
import { reactive, onBeforeMount, inject, defineEmits } from "vue"
import api from "@/api"

import ItemsComponent from "@/components/ItemsComponent.vue"
onBeforeMount(async () => {
  await api.getUsers().then((users) => {
    state.users = users
  })
})
const emits =defineEmits(["set_favorites"])
const favorites = inject('favorites')
const getAlbums = async (id,index) => {
  await api.getAlbums(id).then((data) => {
  
    state.users[index].albums = data
  })
}
const getPhotos = async (id,index) => {
  await api.getPhotos(id).then((data) => {
    const itemIndex = state?.users[index].albums.findIndex((u) => u.id == id)
    console
    state.users[index].albums[itemIndex].photos = data
  })
}
const onClickUser = async (id,index) => {
  const itemIndex = state?.openedUsers.findIndex((el) => el == id)
  if (itemIndex == (-1)) {
    await getAlbums(id,index)
    state?.openedUsers.push(id)
   
  } else {
    state.openedUsers.splice(itemIndex, 1)
  }
}
const onClickPhoto = async (photo) => {
  console.log(favorites)
  emits("set_favorites",photo )
}
const onClickAlbum = async (id,index) => {
  const itemIndex = state?.openedAlbums.findIndex((el) => el == id)
  if (itemIndex == (-1)) {
    await getPhotos(id,index)
    state.openedAlbums.push(id)
   
  } else {
    state.openedAlbums.splice(itemIndex, 1)
  }
}
const state = reactive({
  users: [],
  albums: [],
  photos:[],

  openedUsers: [],
  openedAlbums: [],
  openedPhotos:[]


})

</script>
<style scoped>
.cat_wrap {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  min-width: 10rem;
  min-height: 10rem;
}
.nested{
  padding-left:4rem;
}
</style>
