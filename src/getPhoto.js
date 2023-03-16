import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { page } from './index';

const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = `34297240-c049c9b9a2b820e4864b20225`;

let limit = 40;

async function getPhoto(searchFormInput, page) {
  const response = await axios.get(`${BASE_URL}`, {
    params: {
      key: `${API_KEY}`,
      q: `${searchFormInput}`,
      image_type: `photo`,
      orientation: `horizontal`,
      safesearch: `true`,
      per_page: limit,
      page,
    },
  });

  const { hits, totalHits } = await response.data;
  // const  =  response.data.totalHits;
  // console.log(hits);
  // console.log(totalHits);

  if (hits.length === 0) {
    Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    Notify.success(`Hooray! We found ${totalHits} images.`);

    console.log(response.data);
    return response.data;
  }
}

// export default class ApiService {
//   constructor() {
// this.page = 1;
// this.searchFormInput = '';
//   }
//   async getPhoto (){
//     const options = {
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: 'true',
//       per_page: '40',
//       page: "1",
//     };
//     const response = await axios.get(
//       `https://pixabay.com/api/?key=34297240-c049c9b9a2b820e4864b20225&q=${this.searchFormInput}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
//     );
//     // const hits = await response.data.hits;

//     incrementPage();

//     return response.data.hits;

//   }

//   incrementPage() {
//       this.page += 1;
//      }

// get photo() {
//   return this.searchFormInput;
// }
// set photo(newPhoto) {
//   this.searchFormInput = newPhoto;}

// }
// `https://pixabay.com/api/?key=34297240-c049c9b9a2b820e4864b20225&q=${searchFormInput}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`

export { getPhoto, limit };
