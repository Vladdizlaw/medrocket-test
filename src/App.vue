<template>
  <div id="app">
    <nav>
      <router-link class="nav_btn" to="/catalogue">Каталог</router-link>
      <router-link class="nav_btn" to="/favorites">Избранное</router-link>
    </nav>
    <div class="main-block">
      <router-view @set_favorites="setFavorites" />
    </div>

  </div>
</template>
<script setup>
import { provide, reactive } from 'vue'
const state = reactive({favorites:[]})
provide('favorites', /* value */ state.favorites)
const setFavorites = (photo) => {
  console.log(photo)
  state.favorites.includes(photo) ? state.favorites = state.favorites.filter((p) => { console.log({p}); return p.id !== photo.id }) : state.favorites.push(photo)
}
</script>


<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0;
  padding: 2% 10%;
  /* padding-left:1vw; */
  min-height: 100vh;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #F4F4F4;

}

nav {
  display: flex;
  align-items: center;
  width: 100%;

}

nav a {
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
  min-height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0rem 1rem 0;
}

.nav_btn {
  font-weight: 400;
  display: flex;
  width: 50%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1rem 0rem 1rem 0;

  color: #1C1C1C;
}

.nav_btn:hover {}
</style>
