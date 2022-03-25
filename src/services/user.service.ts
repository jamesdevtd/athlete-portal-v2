import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

export const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

export const getAffiliateDashboard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

export const getAdminDashboard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};
