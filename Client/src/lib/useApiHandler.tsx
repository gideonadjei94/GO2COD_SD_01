import axios from "axios";
import { getToken } from "./store";
import { isTokenExpired, sessionExpiredDialog } from "./tokenAuth";

const BackendURL = import.meta.env.VITE_BACKEND_URL;

const signupURL = import.meta.env.VITE_SIGNUP_URL;
const loginURL = import.meta.env.VITE_LOGIN_URL;

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
  if (isTokenExpired(token)) {
    sessionExpiredDialog(token);
  }
  try {
    const res = await axios.post(endPoint, data, {
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

  if (isTokenExpired(token)) {
    sessionExpiredDialog(token);
  }

  try {
    const res = await axios.put(endPoint, JSON.stringify(data), {
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
    const endPoint = `${BackendURL}/${url}`;
    const token = getToken();

    if (isTokenExpired(token)) {
      sessionExpiredDialog(token);
    }
    const response = await axios.get(endPoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
