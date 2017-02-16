import React from 'react';
import moment from 'moment';
import './review.css';

const Review = (props) => {

  const {
    rating,
    publish_date,
    author,
    body,
    isOpen,
    handleClick
  } = props;

  return (
    <div className="review">
      <div className="review__header">
        <div>Reviewer: {author}</div>
        <div>Date: {moment(publish_date).fromNow()}</div>
        <div>Rating: {rating}</div>
        <div className="button" onClick={handleClick}>{isOpen ? 'Hide' : 'Show'} Comment</div>
      </div>
      {isOpen && <div className="review__body">Comment: {body}</div>}
    </div >
  )
}

export default Review