import axios from 'axios';
import { UnplashedRoot } from '../../utils/data';

const CLIENT_ID =
  '0d54d7bf8f81c9ee80a75d9e1263fbb6b8267fad9d908e597b9f7c4f6bcdee23';

export const fetchPhotos = async (page: number): Promise<UnplashedRoot[]> => {
  return new Promise((resolve) => {
    axios
      .get(
        `https://api.unsplash.com/photos/?client_id=${CLIENT_ID}&per_page=20&page=${page}`
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch(function (error) {
        Promise.reject(error);
      });
  });
};
