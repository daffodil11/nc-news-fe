import axios from 'axios';
import { millisecondsToTimeString } from './utils';

const BASE_URL = 'https://have-i-got-nc-for-you.herokuapp.com/api';

const getAge = datetime => {
  return millisecondsToTimeString(Date.now() - new Date(datetime).getTime());
}

export const getTopics = () => {
  return axios.get(BASE_URL + '/topics');
};

export const getArticles = (topic, sort_by, order) => {
  return axios.get(`${BASE_URL}/articles`, {
    params: { topic, sort_by, order }
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
export const postComment = (article_id, username, body) => {
  return axios.post(`${BASE_URL}/articles/${article_id}/comments`, { username, body }).then(response => response.data);
}

export const sendVote = (section, id, vote) => {
  return axios.patch(`${BASE_URL}/${section}/${id}`, { inc_votes: vote }).then(response => response.data);
};

export const getRandomUser = () => {
  return axios.get(`${BASE_URL}/users/randomuser`)
    .then(({ data }) => data.user);
}

export const deleteComment = comment_id => {
  return axios.delete(`${BASE_URL}/comments/${comment_id}`);
}
