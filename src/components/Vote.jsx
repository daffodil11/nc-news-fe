import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Vote.css';
import * as api from '../utils/api';

function Vote({ section, id, votes, votingDisabled, updateUserVotes, initialVoteState }) {
  const [voteChange, setVoteChange] = useState(initialVoteState);

  const handleVoteChange = change => {
    const currVoteChange = voteChange;
    setVoteChange(currVoteChange + change);
    api.sendVote(section, id, change)
      .then(res => updateUserVotes(id, change))
      .catch(err => setVoteChange(currVoteChange));
  };

  return (
    <div data-cy="vote" >
      <button className={`vote-button${voteChange===1 ? " used" : ""}`} data-cy="upvote" onClick={() => handleVoteChange(1)} disabled={voteChange===1 || votingDisabled} >+</button>
      <span data-cy="votes" >{votes + voteChange}</span>
      <button className={`vote-button${voteChange===-1 ? " used" : ""}`} data-cy="downvote" onClick={() => handleVoteChange(-1)} disabled={voteChange===-1 || votingDisabled}>-</button>      
    </div>
  );
}

Vote.propTypes = {
  section: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  votes: PropTypes.number.isRequired,
  votingDisabled: PropTypes.bool,
  updateUserVotes: PropTypes.func.isRequired,
  initialVoteState: PropTypes.number.isRequired
};

export default Vote;
