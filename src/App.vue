<template>
  <div id="app">
    <ModalComponent v-if="state.viewPhoto.id" :url="state.viewPhoto.url" @close-modal="closeModal" />
    <div class="app-container">
      <nav>
        <router-link class="nav_btn" to="/catalogue">Каталог</router-link>
        <router-link class="nav_btn" to="/favorites">Избранное</router-link>
      </nav>
      <div class="main-block">
        <router-view :favorites="state.favorites" @open-modal="openModal" @set_favorites="setFavorites" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, onBeforeMount } from 'vue'
import ModalComponent from "@/components/ModalComponent.vue"
const state = reactive({ favorites: [], viewPhoto: { id: null, url: null } })
onBeforeMount(() => {
  if (localStorage.getItem("favorites")) {
    state.favorites = JSON.parse(localStorage.getItem("favorites"))
  }
})
const setFavorites = (photo) => {
  const favoriteIndex = state.favorites.findIndex((fav) => fav.id == photo.id)
  if (favoriteIndex == -1) {
    state.favorites.push(photo)
  } else {
    state.favorites.splice(favoriteIndex, 1)
  }
  localStorage.setItem('favorites', JSON.stringify(state.favorites))
}
const openModal = (ev) => {
  state.viewPhoto.id = ev.id
  state.viewPhoto.url = ev.url
}
const closeModal = () => {
  state.viewPhoto.id = null
  state.viewPhoto.url = null
}
</script>


<style>
body {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Roboto, sans-serif;
  text-align: center;
  min-height: 100vh;
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #F4F4F4;
}

.app-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  padding-top: 1rem;
  height: fit-content;
}

nav {
  display: flex;
  align-items: center;
  width: 100%;
  padding-top: 1rem;
}

nav a {
  font-size: 1.3rem;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

nav a.router-link-exact-active {
  background: #EDF9FF;
  color: #117DC1;
  border-radius: 16px;
}

.main-block {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* padding-top:1rem; */
}

.nav_btn {
  /* margin-top:1rem; */
  font-weight: 400;
  display: flex;
  width: 50%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1rem 0rem 1rem 0;
  color: #1C1C1C;
}

@media (max-width: 760px) {
  .app-container {
    width: 90%;
    padding: 1rem;
  }
}
</style>
