import axios from 'axios';
axios.defaults.headers.common['x-api-key'] = '44179146-9b08b79ddd3beefa939deb5d3';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const API_KEY = '44179146-9b08b79ddd3beefa939deb5d3';


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('search-form');
  const gallery = document.querySelector('.image-gallery');

  form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const searchQuery = event.target.searchQuery.value.trim();
      if (!searchQuery) {
          iziToast.error({
              title: 'Error',
              message: 'Please enter a search query.',
          });
          return;
      }

      try {
        const response = await axios.get(`https://pixabay.com/api/`, {
          params: {
              key: API_KEY,
              q: searchQuery,
              image_type: 'photo',
              orientation: 'horizontal',
              safesearch: true,
          },
      });


          const images = response.data.hits;
          if (images.length === 0) {
              iziToast.warning({
                  title: 'No Results',
                  message: 'Sorry, there are no images matching your search query. Please try again.',
              });
              gallery.innerHTML = '';
              return;
          }

          displayImages(images);
      } catch (error) {
          iziToast.error({
              title: 'Error',
              message: 'Something went wrong. Please try again later.',
          });
          console.error('Error fetching images:', error);
      }
  });

  function displayImages(images) {
      gallery.innerHTML = images.map(image => `
          <div class="image-card">
              <img src="${image.webformatURL}" alt="${image.tags}" />
              <p>Likes: ${image.likes}</p>
              <p>Views: ${image.views}</p>
              <p>Comments: ${image.comments}</p>
              <p>Downloads: ${image.downloads}</p>
              <a href="${image.largeImageURL}" target="_blank">View Large Image</a>
          </div>
      `).join('');
  }
});