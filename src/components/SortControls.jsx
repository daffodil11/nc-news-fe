import React from 'react';
import PropTypes from 'prop-types';
import './SortControls.css';

function SortControls({ handleSelectChange, sort_by, order }) {
  return (
    <div className="sort-controls">
          <label className="sort-control">Sort articles by: 
          <select className="sort-control" id="sort_by" onChange={handleSelectChange} value={sort_by || 'created_at'} data-cy="sort-by">
              <option value="created_at">New</option>
              <option value="comment_count">Comments</option>
              <option value="votes">Votes</option>
            </select>
          </label>
          <label className="sort-control">Order by: 
          <select className="sort-control" id="order" onChange={handleSelectChange} value={order || 'desc'} data-cy="order">
              <option value="desc">{sort_by === 'created_at' ? 'New to Old' : 'High to Low'}</option>
              <option value="asc">{sort_by === 'created_at' ? 'Old to New' : 'Low to High'}</option>
            </select>
          </label>
    </div>
  );
}

SortControls.propTypes = {
  handleSelectChange: PropTypes.func.isRequired,
  sort_by: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired
};

export default SortControls;