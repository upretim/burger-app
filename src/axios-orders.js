import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-prac.firebaseio.com/'
})

export default instance;
