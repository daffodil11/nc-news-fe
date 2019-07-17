import axios from 'axios';
import { millisecondsToTimeString } from './utils';

const BASE_URL = 'https://have-i-got-nc-for-you.herokuapp.com/api';

const getAge = datetime => {
  return millisecondsToTimeString(Date.now() - new Date(datetime).getTime());
}

export const getTopics = () => {
  return axios.get(BASE_URL + '/topics');
};

export const getArticles = (topic) => {
  return axios.get(`${BASE_URL}/articles`, {
    params: { topic }
  }).then(({ data: { articles } } ) => {
    return articles.map(article => {
      const age = getAge(article.created_at);
      return { ...article, age };
    });
  });
};

export const getArticle = article_id => {
  return axios.get(`${BASE_URL}/articles/${article_id}`)
    .then(({ data: { article } }) => ({ ...article, created_at: new Date(article.created_at) }));
};

export const getArticleComments = article_id => {
  return axios.get(`${BASE_URL}/articles/${article_id}/comments`)
    .then(({ data: { comments } }) => {
      return comments.map(comment => {
        const age = getAge(comment.created_at);
        return { ...comment, age };
      });
    });
};
