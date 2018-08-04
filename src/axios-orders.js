import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://wenzx-burger-house.firebaseio.com/'
});

export default instance;