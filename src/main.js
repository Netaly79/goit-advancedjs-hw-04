import { handleMoreClick, handleSubmit } from './js/handles';

document.addEventListener('DOMContentLoaded', () => {
  const more = document.querySelector('.load-more');
  const form = document.getElementById('search-form');
  const gallery = document.querySelector('.gallery');

  form.addEventListener('submit', event => handleSubmit(event, more, gallery));
  more.addEventListener('click', event =>
    handleMoreClick(event, more, gallery)
  );
});
