<script setup>
import { reactive, onBeforeMount, defineEmits, defineProps } from "vue"
import api from "@/api"

import ErrorComponent from "@/components/ErrorComponent.vue"
import ItemsComponent from "@/components/ItemsComponent.vue"
import PhotoComponent from "@/components/PhotoComponent.vue"
import StarComponent from "@/components/StarComponent.vue"
import loaderComponent from "@/components/loaderComponent.vue"
import { useFindIndexItem, useFindIndexOpened } from "@/composables/useFindIndex"

const props = defineProps({ favorites: Array })
const emits = defineEmits(["set_favorites"])

const state = reactive({
  users: [],
  openedUsers: [],
  openedAlbums: [],
  errors: { user: false, albums: [], photos:[] },
  loading: { albums: [], photos: [], users: false }
})

const getAlbums = async (id, index) => {
  try {
    state.loading.albums.push(id)
    const data = await api.getAlbums(id)
    state.users[index].albums = data
    state.loading.albums = state.loading.albums.filter(a => a !== id)
  } catch (e) {
    console.log(e)
    state.loading.albums = state.loading.albums.filter(a => a !== id)
    state.errors.albums.push(id)
  }

}

const getUsers = async () => {
  try {
    state.loading.users = true
    const data = await api.getUsers()
    state.users = data
    state.loading.users = false
  } catch (e) {
    console.log(e)
    state.loading.users = false
    state.errors.user = true
  }
}


const getPhotos = async (id, index) => {
  try {
    state.loading.photos.push(id)
    const data = await api.getPhotos(id)
    const albumIndex = useFindIndexItem(state.users[index].albums, id)
    state.users[index].albums[albumIndex].photos = data
    state.loading.photos = state.loading.photos.filter(a => a !== id)
  } catch (e) {
    console.log(e)
    state.loading.photos = state.loading.photos.filter(a => a !== id)
    state.errors.photos.push(id)
  }

}

const clearOpenedItems = (indexUser) => {
  const albumsIdsForClear = state.users[indexUser]?.albums.map(el => el.id)
  state.openedAlbums = state.openedAlbums.filter(el => !albumsIdsForClear.includes(el))
}

const onClickItem = async (id, index, state, func) => {
  const openedIndex = useFindIndexOpened(state, id)
  if (openedIndex !== -1) {
    state.splice(openedIndex, 1)
    clearOpenedItems(index)
  } else {
    state.push(id)
    await func(id, index)
  }
}
const openModal = (url, id) => {
  emits("open-modal", { url, id })
}
const setFavorite = async (photo) => {
  emits("set_favorites", photo)
}

onBeforeMount(async () => {
  await getUsers()
})


</script>
<template>
  <div class="catalog-container">
    <div class="loader main" v-if="state.loading.users">
      <loader-component />
    </div>
    <div class="main" v-if="state.errors.user">
      <ErrorComponent />
    </div>
    <div class="list " v-if="state.users.length && !state.loading.users">
      <div class="items user" v-for="user, index in state.users" :key="user.id">
        <ItemsComponent :id="user.id" :title="user.name" :isOpened="state.openedUsers.includes(user.id)"
          @click.stop.native="onClickItem(user.id, index, state.openedUsers, getAlbums)" />
        <div class="loader" v-if="state.loading.albums.includes(user.id)">
          <loader-component />
        </div>
        <ErrorComponent v-if="state.errors.albums.includes(user.id)" />
        <div class=" list nested" v-if="state.openedUsers.includes(user.id) && !state.loading.albums.includes(user.id)">
          <div class="items album" v-for="album in user.albums" :key="album.id">
            <ItemsComponent :id="album.id" :title="album.title"
              :isOpened="state.openedAlbums.includes(album.id) && state.openedUsers.includes(user.id)"
              @click.native.stop="onClickItem(album.id, index, state.openedAlbums, getPhotos)" />
            <div class="loader" v-if="state.openedUsers.includes(user.id) && state.loading.photos.includes(album.id)">
              <loader-component />
            </div>
            <ErrorComponent v-if="state.errors.photos.includes(album.id)" />
            <div class="photos nested"
              v-if="album.photos && state.openedAlbums.includes(album.id) && !state.loading.photos.includes(album.id)">
              <div v-for="photo in album.photos" :key="photo.id">
                <PhotoComponent :photo="photo" @click.native.stop="openModal(photo.url, photo.id)">
                  <StarComponent :isFavorited="props.favorites.findIndex(p => p.id == photo.id)"
                    @click.native.stop="setFavorite(photo)" />
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
  height: 100%;
  position: relative;
}

.main {
  min-height: 80vh;
  display: flex;
  widtH: 100%;
  justify-content: center;
  align-items: center;
}

.items {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  flex-shrink: 0;

}

.list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
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
  justify-content: flex-start;
  gap: 2rem;
  max-width: 550px;
  position: relative;
}

.nested {
  padding: 1rem 0 0 3.5rem;
}

@media (max-width: 760px) {
  .catalog-container {
    justify-content: center;
  }
}
</style>
