import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { requestImages } from './js/api';
import { checkNextPage, displayImages, showToast } from './js/helper';

let page = 1;
let searchQuery = '';
let img_on_page = 40;
let canScroll = true;
let maximum;

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
      showToast('error', 'Error', 'Please enter a search query');
      return;
    }
    await requestImages(searchQuery, img_on_page, page)
      .then(response => {
        const images = response.data?.hits;
        maximum = response.data.totalHits;

        if (images.length === 0) {
          showToast(
            'info',
            'No Results',
            'Sorry, there are no images matching your search query. Please try again.'
          );
          gallery.innerHTML = '';
          return;
        }
        if (page === 1) {
          showToast(
            'success',
            'Success',
            `Hooray! We found ${response.data.totalHits} images.`,
            'topCenter'
          );
        }

        displayImages(images);
        more.style.display = 'block';
        lightbox.refresh();
        page++;
        canScroll = checkNextPage(
          response.data.totalHits,
          gallery.children.length,
          img_on_page
        );
        if (!canScroll) {
          more.style.display = 'none';
        }
      })
      .catch(error => {
        showToast(
          'error',
          'Error',
          'Something went wrong. Please try again later.'
        );
      });
  });

  more.addEventListener('click', () => {
    requestImages(searchQuery, img_on_page, page).then(response => {
      const images = response.data.hits;
      displayImages(images);
      more.style.display = 'block';
      lightbox.refresh();
      const { height: cardHeight } =
        gallery.firstElementChild.getBoundingClientRect();
      if (page > 1)
        window.scrollBy({
          top: cardHeight * 3,
          behavior: 'smooth',
        });
      page++;
      canScroll = checkNextPage(
        response.data.totalHits,
        gallery.children.length,
        img_on_page
      );
      if (!canScroll) {
        more.style.display = 'none';
      }
    });
  });

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
