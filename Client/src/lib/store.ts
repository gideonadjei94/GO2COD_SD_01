export const setUser = (token: string, user: object) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  else return null;
};

export const getToken = () => {
  return localStorage.getItem("token") || null;
};
