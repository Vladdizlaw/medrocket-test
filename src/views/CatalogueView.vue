
<script setup>
import { reactive, onBeforeMount, defineEmits, defineProps } from "vue"
import api from "@/api"

import ItemsComponent from "@/components/ItemsComponent.vue"
import PhotoComponent from "@/components/PhotoComponent.vue"
const props = defineProps({favorites:Array})
onBeforeMount(async () => {
  await api.getUsers().then((users) => {
    state.users = users
  })
})
const emits = defineEmits(["set_favorites"])
const getAlbums = async (id, index) => {
  await api.getAlbums(id).then((data) => {

    state.users[index].albums = data
  })
}
const getPhotos = async (id, index) => {
  await api.getPhotos(id).then((data) => {
    const itemIndex = state?.users[index].albums.findIndex((album) => album.id == id)
    state.users[index].albums[itemIndex].photos = data
  })
}
const onClickUser = async (id, index) => {
  const itemIndex = state?.openedUsers.findIndex((el) => el == id)
  if (itemIndex == (-1)) {
    await getAlbums(id, index)
    state?.openedUsers.push(id)
  } else {
    state.openedUsers.splice(itemIndex, 1)
  }
}
const onClickPhoto = async (photo) => {
  emits("set_favorites", photo)
}
const onClickAlbum = async (id, index) => {
  const itemIndex = state?.openedAlbums.findIndex((el) => el == id)
  if (itemIndex == (-1)) {
    await getPhotos(id, index)
    state.openedAlbums.push(id)

  } else {
    state.openedAlbums.splice(itemIndex, 1)
  }
}
const state = reactive({
  users: [],
  albums: [],
  photos: [],

  openedUsers: [],
  openedAlbums: [],
  openedPhotos: []
})

</script>
<template>
  <div class="catalog-container">
    <div class="list " v-if="state.users">
      <div class="items user" v-for="user, index in state.users" :key="user.id">
        <ItemsComponent :id="user.id" :title="user.name" :isOpened="state.openedUsers.includes(user.id)"
          @click.stop.native="onClickUser(user.id, index)" />
        <div class=" list nested" v-if="user.albums && state.openedUsers.includes(user.id)">
          <div class="items album" v-for="album in user.albums" :key="album.id">
            <ItemsComponent :id="album.id" :title="album.title" :isOpened="state.openedAlbums.includes(album.id)"
              @click.native.stop="onClickAlbum(album.id, index)" />
            <div class="photos nested" v-if="album.photos && state.openedAlbums.includes(album.id)">
              <div class="" v-for="photo in album.photos" :key="photo.id">
                <PhotoComponent :photo="photo"  
                  @click.native="onClickPhoto(photo)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.catalog-container {
  font-family: 'Roboto';
  font-style: normal;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;

  position: relative;
}

.items {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: start;

}

.list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap:0.5rem;
}

.user {
  
 
  font-weight: 500;
  font-size: 1.5rem;

}

.album {
 
 
  font-weight: 400;
  font-size: 1.3rem;

}
.photos{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
  gap:2rem;
  max-width:50rem;
}

.nested {
  padding: 1rem 0 0 5rem;
}</style>
