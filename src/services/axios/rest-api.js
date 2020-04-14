import axios from 'axios'
import AppHelper from '@/third-party/helper/app-helper.min.js'
import CredMng from '@/third-party/auth/credential-manager.min.js'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = AppHelper.apiEndpoint();
axios.defaults.headers = { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" };

const RestServices = {
    getCookies: () => axios.get(`/sanctum/csrf-cookie`),
    getCredential: () => axios.get(`/api/auth/creds`, CredMng.axiosHeaderToken()),
    postLogin: (email, password) => axios.post(`/api/auth/login`, { email, password }),
    postRegister: (name, email, password) => axios.post(`/api/auth/register`, { name, email, password })
};

export default RestServices;