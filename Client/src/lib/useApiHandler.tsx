import axios from "axios";

import { getToken } from "./store";

const BackendURL = import.meta.env.VITE_BACKEND_URL;
const signupURL = import.meta.env.VITE_SIGNUP_URL;
const loginURL = import.meta.env.VITE_LOGIN_URL;

export const apiClient = axios.create({
  baseURL: BackendURL,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export const register = async (
  data: object,
  contentType = "application/json"
) => {
  try {
    const response = await axios.post(signupURL, data, {
      headers: {
        "Content-Type": `${contentType}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const login = async (data: object, contentType = "application/json") => {
  try {
    const response = await axios.post(loginURL, data, {
      headers: {
        "Content-Type": `${contentType}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postWithToken = async (
  url: string,
  data: object,
  contentType = "application/json"
) => {
  const token = getToken();
  const endPoint = `${BackendURL}/${url}`;
  try {
    const res = await apiClient.post(endPoint, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": `${contentType}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const putWithToken = async (
  url: string,
  data: object,
  contentType = "application/json"
) => {
  const token = getToken();
  const endPoint = `${BackendURL}/${url}`;

  try {
    const res = await apiClient.put(endPoint, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": `${contentType}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getWithToken = async (url: string) => {
  try {
    const token = getToken();
    const response = await apiClient.get(`${BackendURL}/${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
