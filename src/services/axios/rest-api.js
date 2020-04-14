import axios from 'axios'
import AppHelper from '@/third-party/helper/app-helper.min.js'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = AppHelper.apiEndpoint();
axios.defaults.headers = { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" };

const RestServices = {
    getCookies: () => axios.get(`/sanctum/csrf-cookie`)
};

export default RestServices;