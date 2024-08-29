import axios from 'axios';

import { BASE_URL } from '../../../helpers/Constant.js';

export const getAll = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);

    switch (response.status) {
      case 404:
        return { status: false, message: 'Not Found', data: [] };
      default:
        return { status: true, message: 'Success', data: response.data };
    }
  } catch (error) {
    return { status: false, message: error.message, data: [] };
  }
};

export const show = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${parseInt(id)}`);

    switch (response.status) {
      case 404:
        return { status: false, message: 'Not Found', data: {} };
      default:
        return { status: true, message: 'Success', data: response.data };
    }
  } catch (error) {
    return { status: false, message: error.message, data: [] };
  }
};

export const save = async (data, id) => {
  try {
    delete data.id;

    const response = [null, undefined, NaN].includes(id)
      ? await axios.post(`${BASE_URL}/users`, data)
      : await axios.put(`${BASE_URL}/users/${parseInt(id)}`, data);

    switch (response.status) {
      case 400:
        return { status: false, message: 'Bad Request', data: {} };
      default:
        return { status: true, message: 'Success', data: response.data };
    }
  } catch (error) {
    return { status: false, message: error.message, data: [] };
  }
};

export const destroy = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/users/${parseInt(id)}`);

    switch (response.status) {
      case 404:
        return { status: false, message: 'Not Found', data: {} };
      default:
        return { status: true, message: 'Success', data: response.data };
    }
  } catch (error) {
    return { status: false, message: error.message, data: [] };
  }
};
