import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3020/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserDashBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getManagerBoard() {
    return axios.get(API_URL + 'manager', { headers: authHeader() });
  }

  getRefereeBoard() {
    return axios.get(API_URL + 'referee', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
