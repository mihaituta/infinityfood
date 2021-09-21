import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://laravel-api-food.herokuapp.com'
    // baseURL: 'http://api-food.com'
});
const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
}

export default instance