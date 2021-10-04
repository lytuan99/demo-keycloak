import axios from "axios";

export const api = axios.create({
  baseURL: `http://localhost:9001`,
  responseType: "json",
});

export const getAnimals = async (verifyType) => {
  try {
    const res = await api({
      method: "GET",
      url: "/animals",
      params: {verifyType},
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

export const postAnimals = async () => {
  try {
    const res = await api({
      method: "POST",
      url: "/animals",
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

export const putAnimals = async () => {
  try {
    const res = await api({
      method: "PUT",
      url: "/animals",
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

export const deleteAnimals = async () => {
  try {
    const res = await api({
      method: "DELETE",
      url: "/animals",
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

export const getUser = async () => {
  const res = await api({
    method: "GET",
    url: "/user",
  });
  return res;
};

export const getAdmin = async () => {
  const res = await api({
    method: "GET",
    url: "/admin",
  });
  return res;
};
