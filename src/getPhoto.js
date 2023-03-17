import axios from 'axios';

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

  return response;
}

export { getPhoto, limit };
