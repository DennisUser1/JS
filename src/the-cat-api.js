import axios from 'axios';

const url = 'https://api.thecatapi.com/v1';
const api_key = 'live_SHP0bMyrkukUDvF02vxbMceUzyOtE11MXCekHo6LV1NN4Iq0yq5ewkI59zO3jnQi';

axios.defaults.headers.common['x-api-key'] = api_key;
axios.defaults.baseURL = url;

export function fetchBreeds() {
    return axios.get('/breeds?api_key=${api_key}')
      .then(response => {
        return response.data;
      })
      .catch(error => {
        handleAxiosError(error);
        throw error;
      });
  }
  
  export function fetchCatByBreed(breedId) {
    return axios.get(`/images/search?api_key=${api_key}&breed_ids=${breedId}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        handleAxiosError(error);
        throw error;
      });
  }
  
  function handleAxiosError(error) {
    if (error.response) {
      console.log('Response status:', error.response.status);
      Notiflix.Notify.warning('Oops! Something went wrong with the request.');
    } else if (error.request) {
      console.log('Request error:', error.request);
      Notiflix.Notify.warning('Oops! No response received from the server.');
    } else {
      console.log('Error setting up the request:', error.message);
      Notiflix.Notify.warning('Oops! Request setup error.');
    }
  }
  
  
  
  
  
  
  
  
  