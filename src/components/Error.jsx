import React from 'react';
import './Error.css';

function Error({ location }) {
  const msg = location && location.state && location.state.msg;
  return (
    <div className="error" data-cy="error-message">
      <h2>Error!</h2>
      {msg && <p>{msg}</p>}      
    </div>
  );
}

export default Error;
