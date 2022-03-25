import axios from "axios";

const API_URL = "http://localhost:8080/api/user/";

export const signup = ( email: string, password: string ) => {
  return axios.post(API_URL + "signup", {
    email: email,
    password: password
  });
};

export const login = (email: string, password: string) => {
  return axios
    .post(API_URL + "sign-in", {
      email,
      password,
    })
    .then((response) => {
      console.log('signin Sucess RESPONSE: ' + response);
      if (response.data.authToken) {
        // THIS is temporary: token will be stored in memory after testing
        // localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    })
};

export const logout = () => {
  localStorage.removeItem("user");
};

// export const getCurrentUser = () => {
//   const userStr = localStorage.getItem("user");
//   if (userStr) return JSON.parse(userStr);

//   return null;
// };

