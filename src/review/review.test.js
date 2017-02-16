import React from 'react'
import { shallow } from 'enzyme'
import Review from './index'
import moment from 'moment'

describe('<Review />', () => {
  const minProps = {
    rating: 3.2,
    publish_date: "2016-09-04T23:25:47.642388Z",
    author: 'Fay Lemke'
  }

  it('should render without error', () => {
    const wrapper = shallow(<Review />);

    expect(wrapper.find('.review').length).toEqual(1);
  })

  it('should render a review header but no body if isOpen is false or undefined', () => {
    const wrapper = shallow(<Review {...minProps} />);

    expect(wrapper.contains([
      <div>Reviewer: {minProps.author}</div>,
      <div>Date: {moment(minProps.publish_date).fromNow()}</div>,
      <div>Rating: {minProps.rating}</div>
    ])).toEqual(true);
    expect(wrapper.find('.review__body').length).toEqual(0);
  })

  it('should render a review body if isOpen is true', () => {
    const wrapper = shallow(<Review {...minProps} isOpen={true} body="What's up?" />);

    expect(wrapper.find('.review__body').length).toEqual(1);
  })

  it('should call the handleClick prop when clicked', () => {
    let handleClickMock = jest.fn();

    const wrapper = shallow(<Review {...minProps} handleClick={handleClickMock} />);
    wrapper.find('.button').simulate('click');

    expect(handleClickMock).toBeCalled();

  })
})