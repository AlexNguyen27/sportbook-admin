import axios from 'axios';

// BASE URL FOR PREDICTION
export default axios.create({
  baseURL: 'https://predict-sport.herokuapp.com',
});
