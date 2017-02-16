import React, { Component } from 'react';
import fetchService from '../fetch';
import Review from '../review'

import './review-list.css';
class ReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    }
  }
  componentDidMount = async () => {
    try {
      let { data } = await fetchService('/api/reviews');
      this.setState({
        reviews: data
      });
    } catch (exception) {
      console.log(exception);
    }
  }

  handleClick = async index => {
    let clickedReview = this.state.reviews[index];
    let updatedReview = {
      ...clickedReview,
      isOpen: !clickedReview.isOpen
    }
    if(updatedReview.isOpen && !updatedReview.body){
      let response = await fetchService(`/api/reviews/${updatedReview.id}`);
      updatedReview = {
        ...updatedReview,
        body: response.data.body
      }
    }



    let updatedReviews = [
      ...this.state.reviews.slice(0, index),
      updatedReview,
      ...this.state.reviews.slice(index + 1)
    ];

    this.setState({
      reviews: updatedReviews
    });

  }
  render() {
    let reviews = this.state.reviews.map((review, i) => {
      return <Review {...review} handleClick={() => this.handleClick(i)} key={review.id} />
    })
    return (
      <div className="list">
        {reviews}
      </div>
    )
  }
}

export default ReviewList;