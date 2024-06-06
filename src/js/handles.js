import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { checkNextPage, displayImages, showToast } from './helper';
import { requestImages } from './api';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let searchQuery = '';
let page = 1;
let canScroll = true;
let img_on_page = 40;

export async function handleSubmit(event, more, gallery) {
  event.preventDefault();

  more.style.display = 'none';
  gallery.innerHTML = '';
  page = 1;
  searchQuery = event.target.elements[0].value.trim();
  if (!searchQuery) {
    showToast('error', 'Error', 'Please enter a search query');
    return;
  }

  try {
    const { hits, totalHits } = await requestImages(
      searchQuery,
      img_on_page,
      page
    );

    if (hits.length === 0) {
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
        `Hooray! We found ${totalHits} images.`,
        'topCenter'
      );
    }

    displayImages(hits);
    more.style.display = 'block';
    lightbox.refresh();
    page++;
    canScroll = checkNextPage(totalHits, gallery.children.length);
    if (!canScroll) {
      more.style.display = 'none';
    }
  } catch (error) {
    showToast(
      'error',
      'Error',
      'Something went wrong. Please try again later.'
    );
  }
}

export async function handleMoreClick(event, more, gallery) {
  try {
    const { hits, totalHits } = await requestImages(
      searchQuery,
      img_on_page,
      page
    );
    displayImages(hits);
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
    canScroll = checkNextPage(totalHits, gallery.children.length);
    if (!canScroll) {
      more.style.display = 'none';
    }
  } catch (error) {
    showToast(
      'error',
      'Error',
      'Something went wrong. Please try again later.'
    );
  }
}
