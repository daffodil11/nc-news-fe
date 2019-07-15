import axios from 'axios';

const BASE_URL = 'https://have-i-got-nc-for-you.herokuapp.com/api/';

export const getTopics = () => {
  return axios.get(BASE_URL + 'topics');
};
