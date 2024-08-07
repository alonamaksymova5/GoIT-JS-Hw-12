import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { createGalleryMarkup } from './js/render-functions.js';
import { searchImages, limit } from './js/pixabay-api.js';

const gallery = document.querySelector('.gallery');
const searchForm = document.querySelector('.js-search-form');
const loader = document.querySelector('.loader');
const btnLoadMore = document.querySelector('.js-load-btn');

let currentPage = 1;
let query = '';

btnLoadMore.style.display = 'none';
loader.style.display = 'none';

searchForm.addEventListener('submit', handleSearch);

async function handleSearch(event) {
  event.preventDefault();
  const form = event.currentTarget;
  query = form.elements.query.value.trim().toLowerCase();

  if (query === '') {
    gallery.innerHTML = '';
    showWarningMessage('Please enter a search query.');
    return;
  }

  loader.style.display = 'block';
  gallery.innerHTML = '';
  currentPage = 1;

  try {
    const data = await searchImages(query, currentPage);
    const markup = createGalleryMarkup(data);
    gallery.innerHTML = markup;
    lightbox.refresh();

    if (data.totalHits > 15) {
      btnLoadMore.style.display = 'block';
    } else {
      btnLoadMore.style.display = 'none';
    }
  } catch (error) {
    onSearchError(error);
  } finally {
    loader.style.display = 'none';
    form.reset();
  }
}

btnLoadMore.addEventListener('click', async () => {
  currentPage += 1;
  loader.style.display = 'block';

  try {
    const data = await searchImages(query, currentPage);
    const markup = createGalleryMarkup(data);
    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();

    scrollPage();

    const totalPages = Math.ceil(data.totalHits / limit);

    if (currentPage >= totalPages) {
      btnLoadMore.style.display = 'none';
      showInfoMessage(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    onSearchError(error);
  } finally {
    loader.style.display = 'none';
  }
});

function onSearchError(error) {
  showErrorMessage(
    'Sorry, there are no images matching your search query. Please try again!'
  );
  gallery.innerHTML = '';
  btnLoadMore.style.display = 'none';
  loader.style.display = 'none';
}

function scrollPage() {
  const itemHeight = document
    .querySelector('.gallery-item')
    .getBoundingClientRect().height;

  window.scrollBy({
    top: itemHeight * 2,
    behavior: 'smooth',
  });
}

let lightbox = new SimpleLightbox('.gallery .gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
});

function showErrorMessage(message) {
  iziToast.error({
    class: 'izi-toast',
    message: message,
    position: 'topRight',
  });
}

function showWarningMessage(message) {
  iziToast.warning({
    class: 'izi-toast',
    message: message,
    position: 'topRight',
  });
}

function showInfoMessage(message) {
  iziToast.info({
    class: 'izi-toast',
    message: message,
    position: 'bottomRight',
  });
}
