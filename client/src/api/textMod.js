
import axios from 'axios';
import FormData  from 'form-data'

const handelContentMod = async (title, content) =>{
  const data = new FormData();
  data.append('text', title + content);
  data.append('mode', 'ml');
  data.append('lang', 'en');
  data.append('api_user', '808555154');
  data.append('api_secret', 'aNHQeSvRBNJWa7YQfDvkgiXpzxieLHqs');

  return axios.post('https://api.sightengine.com/1.0/text/check.json', data)
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.error('Error:', error);
    return null;
  });
}



export {
  handelContentMod
}
