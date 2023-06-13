import axios from 'axios'
export default {
  getAlbums: async function (id) {
    const { data } = await axios.get(
      `https://json.medrocket.ru/albums?userId=${id}`
    )
    return data
  },

  getUsers: async function () {
    const { data } = await axios.get('https://json.medrocket.ru/users/')
    return data
  },

  getPhotos: async function (id) {
    const { data } = await axios.get(
      `https://json.medrocket.ru/photos?albumId=${id}`
    )
    return data
  },
}
