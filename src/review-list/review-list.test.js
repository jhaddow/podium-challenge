import React from 'react'
import { shallow } from 'enzyme'
import FetchMock from 'fetch-mock'

import ReviewList from './index'
import Review from '../review'
import { baseUrl } from '../fetch'


describe('<ReviewList />', () => {
  const reviews = [
    {
      "rating": 0.8,
      "publish_date": "2016-09-05T23:25:47.642350Z",
      "id": "9783221620868",
      "author": "Kaley Schiller"
    },
    {
      "rating": 3.2,
      "publish_date": "2016-09-04T23:25:47.642388Z",
      "id": "9793364045824",
      "author": "Fay Lemke"
    }
  ];

  it('should render without errors', () => {
    const wrapper = shallow(<ReviewList />);

    expect(wrapper.find('.list').length).toEqual(1);
  })

  it('should render array of reviews', () => {

    const wrapper = shallow(<ReviewList />)
    wrapper.setState({ reviews: reviews });

    expect(wrapper.find(Review).length).toEqual(2);
  })

  describe('handleClick', () => {
    let mockedFetch;
    beforeEach(() => {
      mockedFetch = FetchMock.get(`${baseUrl}/api/reviews/9793364045824`, {
        status: 200,
        body: {
          "data": {
            "rating": 3.2,
            "publish_date": "2016-09-04T23:25:47.642388Z",
            "id": "9793364045824",
            "body": "Can one desire too much of a good thing?.",
            "author": "Fay Lemke"
          }
        }
      });
    })

    afterEach(() => {
      mockedFetch.restore();
    })

    it('should update update review at index with body', async () => {
      const wrapper = shallow(<ReviewList />);
      wrapper.setState({ reviews: reviews });
      const instance = wrapper.instance();

      await instance.handleClick(1);

      expect(wrapper.state('reviews')).toEqual([
        {
          "rating": 0.8,
          "publish_date": "2016-09-05T23:25:47.642350Z",
          "id": "9783221620868",
          "author": "Kaley Schiller"
        },
        {
          "rating": 3.2,
          "publish_date": "2016-09-04T23:25:47.642388Z",
          "id": "9793364045824",
          "body": "Can one desire too much of a good thing?.",
          "author": "Fay Lemke",
          "isOpen": true
        }
      ]);
    })

    it('should not make api call if body is defined', async () => {
      let reviews = [{
        "rating": 3.2,
        "publish_date": "2016-09-04T23:25:47.642388Z",
        "id": "9793364045824",
        "body": "Can one desire too much of a good thing?.",
        "author": "Fay Lemke",
        "isOpen": false
      }];

      const wrapper = shallow(<ReviewList />);
      wrapper.setState({ reviews: reviews });
      const instance = wrapper.instance();

      await instance.handleClick(0);

      expect(mockedFetch.called(`${baseUrl}/api/reviews/9793364045824`)).toEqual(false);
      expect(wrapper.state('reviews')).toEqual([{
        "rating": 3.2,
        "publish_date": "2016-09-04T23:25:47.642388Z",
        "id": "9793364045824",
        "body": "Can one desire too much of a good thing?.",
        "author": "Fay Lemke",
        "isOpen": true
      }])
    })

    it('should set isOpen on click review to false if true', async () => {
      let reviews = [{
        "rating": 3.2,
        "publish_date": "2016-09-04T23:25:47.642388Z",
        "id": "9793364045824",
        "body": "Can one desire too much of a good thing?.",
        "author": "Fay Lemke",
        "isOpen": true
      }];

      const wrapper = shallow(<ReviewList />);
      wrapper.setState({ reviews: reviews });
      const instance = wrapper.instance();

      await instance.handleClick(0);

      expect(mockedFetch.called(`${baseUrl}/api/reviews/9793364045824`)).toEqual(false);
      expect(wrapper.state('reviews')).toEqual([{
        "rating": 3.2,
        "publish_date": "2016-09-04T23:25:47.642388Z",
        "id": "9793364045824",
        "body": "Can one desire too much of a good thing?.",
        "author": "Fay Lemke",
        "isOpen": false
      }])
    })

  })


})
