import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:9001`,
  responseType: 'json',
});

export const getAnimals = async (token) => {
  try {
    const res = await api({
      method: 'GET',
      url: '/animals',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    return res;
  } catch (error) {
    return error.response;
  }
}

export const getUser = async (token) => {
  const res = await api({
    method: 'GET',
    url: '/user',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  return res;
}

export const getAdmin = async (token) => {
  const res = await api({
    method: 'GET',
    url: '/admin',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  return res;
}

