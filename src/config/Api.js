import axios from 'axios';

export default axios.create({
    baseURL: 'http://192.168.1.102:5000'
});