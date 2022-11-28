/* eslint-disable camelcase */
import axios from 'axios';
import { SearchUnplashedRoot, UnplashedRoot } from '../../utils/data';

const BASE_URL = 'https://api.unsplash.com';
const CLIENT_ID =
  '0d54d7bf8f81c9ee80a75d9e1263fbb6b8267fad9d908e597b9f7c4f6bcdee23';

interface IPhoto {
  page: number;
  orderBy?: string;
}

export const fetchPhotos = async ({
  page,
  orderBy,
}: IPhoto): Promise<UnplashedRoot[]> => {
  return new Promise((resolve) => {
    axios
      .get(`${BASE_URL}/photos/?client_id=${CLIENT_ID}&per_page=20`, {
        params: { page: page, order_by: orderBy },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch(function (error) {
        Promise.reject(error);
      });
  });
};

interface ISearch extends IPhoto {
  query: string;
}

export const searchPhotos = async ({
  page,
  query,
  orderBy,
}: ISearch): Promise<SearchUnplashedRoot> => {
  return new Promise((resolve) => {
    axios
      .get(`${BASE_URL}/search/photos/?client_id=${CLIENT_ID}&per_page=20`, {
        params: { page: page, query: query, order_by: orderBy },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch(function (error) {
        Promise.reject(error);
      });
  });
};
