<template>
  <div id="app">
    <nav>
      <router-link class="nav_btn" to="/catalogue">Каталог</router-link>
      <router-link class="nav_btn" to="/favorites">Избранное</router-link>
    </nav>
    <div class="main-block">
      <router-view :favorites="state.favorites" @set_favorites="setFavorites" />
    </div>

  </div>
</template>
<script setup>
import { reactive } from 'vue'
const state = reactive({favorites:[],favoritesId:[]})

const setFavorites = (photo) => {
  const favoriteIndex = state.favorites.findIndex((fav) =>fav.id == photo.id)
  if (favoriteIndex==-1) {
    state.favorites.push(photo)

  }else{
    state.favorites.splice(favoriteIndex,1)
   
  }
  console.log(state.favorites)
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
