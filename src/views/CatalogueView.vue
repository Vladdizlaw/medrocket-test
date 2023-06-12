
<script setup>
import { reactive, onBeforeMount, defineEmits, defineProps } from "vue"
import api from "@/api"

import ItemsComponent from "@/components/ItemsComponent.vue"
import PhotoComponent from "@/components/PhotoComponent.vue"
import StarComponent from "@/components/StarComponent.vue"
import loaderComponent from "@/components/loaderComponent.vue"

import { useFindIndexOpenedItem } from "@/composables/useFindIndex"
const props = defineProps({ favorites: Array })
onBeforeMount(async () => {
  await api.getUsers().then((users) => {
    state.users = users
  })
})
const emits = defineEmits(["set_favorites"])
const getAlbums = async (id, index) => {
  state.loading.albums.value = true
  state.loading.albums.loadingBuffer.push(id)
  await api.getAlbums(id).then((data) => {
    state.users[index].albums = data
    state.loading.albums.loadingBuffer=state.loading.albums.loadingBuffer.filter(a=>a !==id)
    state.loading.albums.value = false
  })
}
const getPhotos = async (id, index) => {
  state.loading.photos = true
  await api.getPhotos(id).then((data) => {
    const itemIndex = state?.users[index].albums.findIndex((album) => album.id == id)
    state.users[index].albums[itemIndex].photos = data
    state.loading.photos = false
    
  })
}
const onClickUser = async (id, index) => {

  const itemIndex = useFindIndexOpenedItem(state?.openedUsers, id)
  if (itemIndex == (-1)) {

    state?.openedUsers.push(id)
    await getAlbums(id, index)

  } else {
    state.openedUsers.splice(itemIndex, 1)
  }
}
const setFavorite = async (photo) => {
  emits("set_favorites", photo)
}
const onClickAlbum = async (id, index) => {
  const itemIndex = useFindIndexOpenedItem(state.openedAlbums, id)
  if (itemIndex == (-1)) {
    state.openedAlbums.push(id)
    await getPhotos(id, index)


  } else {
    state.openedAlbums.splice(itemIndex, 1)
  }
}
const state = reactive({
  users: [],

  openedUsers: [],
  openedAlbums: [],
  openedPhotos: [],

  loading: { users: false, albums:{value: false, loadingBuffer:[]} , photos: false }
})

</script>
<template>
  <div class="catalog-container">
    <div class="list " v-if="state.users">
      <div class="items user" v-for="user, index in state.users" :key="user.id">
        <ItemsComponent :id="user.id" :title="user.name" :isOpened="state.openedUsers.includes(user.id)"
          @click.stop.native="onClickUser(user.id, index)" />
          <div class="loader" v-if="state.loading.albums.value && state.loading.albums.loadingBuffer.includes(user.id)">
          <loader-component />
        </div>
        <div class=" list nested" v-if="state.openedUsers.includes(user.id) ">
          <div class="items album" v-for="album in user.albums" :key="album.id">
            <ItemsComponent :id="album.id" :title="album.title" :isOpened="state.openedAlbums.includes(album.id)&&state.openedUsers.includes(user.id)"
              @click.native.stop="onClickAlbum(album.id, index)" />
              <div class="loader" v-if="state.loading.photos && state.openedUsers.includes(user.id)&&! state.loading.albums.loadingBuffer.includes(user.id)">
          <loader-component />
        </div>
            <div class="photos nested" v-if="album.photos && state.openedAlbums.includes(album.id) && !state.loading.photos">
              <div  v-for="photo in album.photos" :key="photo.id">
                <PhotoComponent :photo="photo">
                  <StarComponent :isFavorited="props.favorites.findIndex(p => p.id == photo.id)"
                    @click.native="setFavorite(photo)" />
                </PhotoComponent>
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
  flex-shrink: 0;

}

.list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.loader {
  /* height:10rem; */
  width: 100%;

}

.user {


  font-weight: 500;
  font-size: 2rem;

}

.album {


  font-weight: 400;
  font-size: 1.7rem;

}

.photos {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
  gap: 2rem;
  max-width: 550px;
  position: relative;
}

.nested {
  padding: 1rem 0 0 3.5rem;
}</style>
