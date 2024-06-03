import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

axios.defaults.headers.common['x-api-key'] =
  '44179146-9b08b79ddd3beefa939deb5d3';
axios.defaults.headers = ['Access-Control-Allow-Origin'];
const API_KEY = '44179146-9b08b79ddd3beefa939deb5d3';
const baseURL = `https://pixabay.com/api/`;
let page = 1;
let searchQuery = '';
let img_on_page = 100;
let maximum;
let canScroll = true;

document.addEventListener('DOMContentLoaded', () => {
  const more = document.querySelector('.load-more');
  const form = document.getElementById('search-form');
  const gallery = document.querySelector('.gallery');

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    more.style.display = 'none';
    gallery.innerHTML = '';
    page = 1;
    searchQuery = event.target.searchQuery.value.trim();
    if (!searchQuery) {
      iziToast.error({
        title: 'Error',
        message: 'Please enter a search query.',
      });
      return;
    }
    requestImages();
  });

  function displayImages(images) {
    gallery.innerHTML += images
      .map(
        image => `
          <div class="image-card">
            <a href="${image.largeImageURL}" class="gallery_link">
              <img class="image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
              <div class="image-attributes">
                <div class="item">
                  <p>Likes: </p>
                  <p> ${image.likes}</p>
                </div>
                <div class="item">
                  <p>Views: </p>
                  <p> ${image.views}</p>
                </div>
                <div class="item">
                  <p>Comments: </p>
                  <p> ${image.comments}</p>
                </div>
                <div class="item">
                  <p>Downloads:</p>
                  <p> ${image.downloads}</p>
                </div>
              </div>
            </a>
          </div>
      `
      )
      .join('');

    more.style.display = 'block';
    lightbox.refresh();

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }

  async function requestImages() {
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

      const images = response.data.hits;
      maximum = response.data.totalHits;

      if (images.length === 0) {
        iziToast.warning({
          title: 'No Results',
          message:
            'Sorry, there are no images matching your search query. Please try again.',
        });
        gallery.innerHTML = '';
        return;
      }
      if (page === 1) {
        iziToast.success({
          title: 'Success',
          message: `Hooray! We found ${response.data.totalHits} images.`,
          position: 'topCenter',
        });
      }

      displayImages(images);
      page++;
      canScroll = checkNextPage(response.data.totalHits);
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
      });
    }
  }

  more.addEventListener('click', () => {
    requestImages();
  });

  function checkNextPage(maximum) {
    if (maximum < gallery.children.length + img_on_page) {
      more.style.display = 'none';
      iziToast.info({
        title: 'Limit',
        message: "We're sorry, but you've reached the end of search results.",
      });
      return false;
    }
    return true;
  }

  // infinite scrool

  // const scroll_listener = window.addEventListener('scroll', () => {
  //   if (!canScroll) {
  //     window.removeEventListener(scroll_listener);
  //   }
  //   if (
  //     window.innerHeight + window.scrollY >= document.body.offsetHeight - 50 &&
  //     searchQuery.length > 0 &&
  //     checkNextPage(maximum) &&
  //     maximum >= page * img_on_page
  //   ) {
  //     requestImages();
  //     console.log(page);
  //   }
  // });
});
