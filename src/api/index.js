import axios from 'axios'
export default {
 getAlbums : function (id)  {
  try {
    console.log(id)
  } catch (err) {
    return err
  }
},

 getUsers: async function ()  {
  try {
    const { data } = await axios.get('https://json.medrocket.ru/users/')
    console.log(data)
    return data
  } catch (err) {
    return err
  }
},

getPhotos : function (id)  {
  try {
    console.log(id)
  } catch (err) {
    return err
  }
}
}