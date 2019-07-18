import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Vote.css';
import * as api from '../utils/api';

function Vote({ section, id, votes }) {
  const [voteChange, setVoteChange] = useState(0);

  const handleVoteChange = change => {
    setVoteChange(voteChange + change);
    api.sendVote(section, id, change);
  };

  return (
    <div data-cy="vote" >
      <button data-cy="upvote" onClick={() => handleVoteChange(1)} disabled={voteChange===1} >+</button>
      <span data-cy="votes" >{votes + voteChange}</span>
      <button data-cy="downvote" onClick={() => handleVoteChange(-1)} disabled={voteChange===-1}>-</button>      
    </div>
  );
}

Vote.propTypes = {
  section: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  votes: PropTypes.number.isRequired
};

export default Vote;
