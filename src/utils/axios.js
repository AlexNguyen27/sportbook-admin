import axios from 'axios';

export default axios.create({
  // baseURL: 'http://6bfe10facf33.ngrok.io/',
  // baseURL: 'https://elearning-server-2020.herokuapp.com/',
  baseURL: 'http://localhost:9000/graphql',
});
