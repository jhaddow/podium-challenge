import React, { Component } from 'react';
import fetchService from '../fetch';

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
  render() {
    return (
      <div>
        {this.state.reviews}
      </div>
    )
  }
}

export default ReviewList;