import React from 'react';
import PropTypes from 'prop-types';
import styles from './ArticleCard.css';

function ArticleCard({  }) {
  return (
    <div className={styles.base}>
      
    </div>
  );
}

ArticleCard.defaultProps = {};

ArticleCard.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.string,
  votes: PropTypes.number.isRequired,
  userVotes: PropTypes.number
};

export default ArticleCard;
