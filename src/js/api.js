import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  '44179146-9b08b79ddd3beefa939deb5d3';
axios.defaults.headers = ['Access-Control-Allow-Origin'];
const API_KEY = '44179146-9b08b79ddd3beefa939deb5d3';
const baseURL = `https://pixabay.com/api/`;

export async function requestImages(searchQuery, img_on_page, page) {
  try {
    const response = await axios.get(baseURL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: img_on_page,
        page,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
}
