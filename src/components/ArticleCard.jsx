import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import './ArticleCard.css';

function ArticleCard({ article: { title, article_id, topic, author, age, votes, userVotes, comment_count } }) {
  return (
    <Link className="article-card" data-cy="article-card" to={`/${topic}/${article_id}`} >
      <div>
        <h3 className="article-title" data-cy="title">{title}</h3>
        <div className="article-info">
          <span data-cy="author">{author}</span>
          <span data-cy="timestamp">{age} ago</span>
        </div>
        <div className="article-interactions">
          <span data-cy="comments">{comment_count} comments</span>
          <span data-cy="votes">{votes}</span>
        </div>
      </div>
    </Link>
  );
}

ArticleCard.defaultProps = {};

ArticleCard.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired,
    article_id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    age: PropTypes.string,
    comment_count: PropTypes.number,
    votes: PropTypes.number.isRequired,
    userVotes: PropTypes.number
  })
};

export default ArticleCard;
