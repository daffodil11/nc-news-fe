import axios from 'axios';

const BASE_URL = 'https://have-i-got-nc-for-you.herokuapp.com/api/';

export const getTopics = () => {
  return axios.get(BASE_URL + 'topics');
};

export const getArticles = () => {
  return axios.get(BASE_URL + 'articles').then(({ data: { articles } } ) => {
    return articles.map(article => ({ ...article, created_at: new Date(article.created_at) }));
  });
};
