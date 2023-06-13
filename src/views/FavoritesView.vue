<template>
  <div class="favorites-container">
    <div v-if="!props.favorites.length" class="favorites-empty">
      <NoFavoritesComponent />
      <div class="favorites-empty_title">
        Список избранного пуст
      </div>
      <div class="favorites-empty_p">Добавляйте изображения, нажимая на звездочки</div>
    </div>
    <div class="photo-container" v-for="photo in props.favorites" :key="photo.id">
      <PhotoComponent :photo="photo" @click.native.stop="openModal(photo.url, photo.id)">
        <StarComponent :isFavorited="props.favorites.findIndex(p => p.id == photo.id)"
          @click.native.stop="setFavorite(photo)" />
      </PhotoComponent>
      <div class="photo-title">
        {{ photo.title }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue"
import PhotoComponent from "@/components/PhotoComponent.vue"
import StarComponent from "@/components/StarComponent.vue"
import NoFavoritesComponent from "@/components/NoFavoritesComponent.vue"

const props = defineProps({
  favorites: Array
})
const emits = defineEmits(['set_favorites', 'open-modal'])
const setFavorite = async (photo) => {
  emits("set_favorites", photo)
}
const openModal = (url, id) => {
  emits("open-modal", { url, id })
}
</script>
<style scoped >
.favorites-container {
  font-family: 'Roboto';
  font-style: normal;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items:flex-start;
  flex-wrap: wrap;
  gap: 2rem;
  width: 80%;
  height: 100%;
  position: relative;
  padding-top: 1rem;
}

.favorites-empty {
  min-height: 80vh;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:1rem;
}

.favorites-empty_title {
  margin-top:2rem;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 1.8rem;
}
.favorites-empty_p{
  font-size:1.5rem;
}
.photo-container {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 150px;
  line-height: 100%;
  gap: 1rem;
}

.photo-title {
  text-align: start;
}
</style>

