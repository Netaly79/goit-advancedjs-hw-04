import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function showToast(type, header, message, position = 'topLeft') {
  switch (type) {
    case 'error':
      iziToast.error({
        title: header,
        message,
      });
      break;
    case 'success':
      iziToast.success({
        title: header,
        message,
        position,
      });
      break;
    case 'info':
      iziToast.warning({
        title: header,
        message,
      });
      break;
  }
}

export function checkNextPage(maximum, length, count) {
  if (maximum < length + count) {
    showToast(
      'info',
      'Limit',
      "We're sorry, but you've reached the end of search results."
    );
    return false;
  }
  return true;
}

export function displayImages(images) {
  const gallery = document.querySelector('.gallery');
  const imgCards = images
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
  gallery.insertAdjacentHTML('beforeend', imgCards);
}
