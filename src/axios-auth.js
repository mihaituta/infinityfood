import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://food/api'
});

const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
}

export default instance