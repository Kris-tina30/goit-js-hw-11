import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getPhoto } from './getPhoto';
import { limit } from './getPhoto';
import { page } from './getPhoto';
import { incrementPage } from './getPhoto';

let searchFormInput = '';

let isButtonVisible = false;

const submitForm = document.querySelector('#search-form');
const loadMoreButton = document.querySelector('.load-more');
const galleryCard = document.querySelector('.gallery');

submitForm.addEventListener('submit', onSubmit);

loadMoreButton.addEventListener('click', onClick);

function onSubmit(e) {
  e.preventDefault();
  searchFormInput = e.currentTarget.elements.searchQuery.value;

  page = 1;

  galleryCard.innerHTML = '';

  getPhoto(searchFormInput).then(renderPhotos);
  if (page >= 1 && page < 500) {
    return toggleButton();
  }
}

function onClick() {
  getPhoto(searchFormInput).then(renderPhotos);
  if (page >= totalHits) {
    Notify.warning(
      " We're sorry, but you've reached the end of search results."
    );
    loadMoreButton.classList.add('visually-hidden');
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

function renderPhotos(hits) {
  markUpPhotos(hits);
}

function resetPage() {
  page = 1;
}

function toggleButton() {
  if (isButtonVisible) {
    return;
  }
  isButtonVisible = true;
  loadMoreButton.classList.remove('visually-hidden');
}

// function toggleLoadButton() {
//   if (page >= totalHits) {
//     Notify.warning(
//      " We're sorry, but you've reached the end of search results."
//     );
//     loadMoreButton.classList.add('visually-hidden');
//   }
// }

// import ApiService from './getPhoto';
// const ApiService = new ApiService();
// console.log(ApiService);

// const options = {

//     // key: '34297240-c049c9b9a2b820e4864b20225',
//     // q: `${searchFormInput}`,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: 'true',

// };
// function onSubmit(e) {
//   e.preventDefault();
//   ApiService.photo = e.currentTarget.elements.searchQuery.value;

//   ApiService.getPhoto()
//   .then(renderPhotos);
// }

// function onClick(e) {

//   ApiService.getPhoto().then(renderPhotos);
// }
