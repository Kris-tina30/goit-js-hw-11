import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { getPhoto, limit } from './getPhoto';

let searchFormInput = '';
let page = 1;

const submitForm = document.querySelector('#search-form');
const loadMoreButton = document.querySelector('.load-more');
const galleryCard = document.querySelector('.gallery');

submitForm.addEventListener('submit', onSubmit);

loadMoreButton.addEventListener('click', onClickLoadMoreButton);

async function onSubmit(e) {
  e.preventDefault();
  try {
    searchFormInput = e.currentTarget.elements.searchQuery.value;
    if (searchFormInput.trim() === '') return;
    page = 1;

    galleryCard.innerHTML = '';

    const response = await getPhoto(searchFormInput, page);

    const hits = response.data.hits;
    const totalHits = response.data.totalHits;

    markUpPhotos(hits);

    if (hits.length === 0) {
      Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    Notify.success(`Hooray! We found ${totalHits} images.`);

    if (page >= 1) {
      return toggleButton();
    }
  } catch (error) {
    console.dir(error);
    Notify.failure(` ${error.message}`);
  }
}

async function onClickLoadMoreButton() {
  try {
    incrementPage();
    const response = await getPhoto(searchFormInput, page);

    const totalHits = response.data.totalHits;

    markUpPhotos(response.data.hits);

    if (page * limit >= totalHits) {
      Notify.warning(
        " We're sorry, but you've reached the end of search results."
      );
      loadMoreButton.classList.add('visually-hidden');
      return;
    }
  } catch (error) {
    console.dir(error);
    Notify.failure(` ${error.message}`);
  }
}

function markUpPhotos(hits) {
  const markUp = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
  <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="${largeImageURL}" width = "270" hight = "180" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>  `;
      }
    )
    .join('');
  galleryCard.insertAdjacentHTML('beforeend', markUp);
}

function toggleButton() {
  loadMoreButton.classList.remove('visually-hidden');
}

function incrementPage() {
  page += 1;
}

export { page };
