import React, { Component } from 'react';

class Review extends Component {
  render() {
    const {
      rating,
      publish_date,
      author,
      body,
      isOpen
    } = this.props;
    return (
      <div onClick={this.props.handleClick}>
        <div>{author}</div>
        <div>{publish_date}</div>
        <div>{rating}</div>
        {isOpen && <div>{body}</div>}
      </div >
    )
  }
}

export default Review