import FetchMock from 'fetch-mock';
import fetchService, { baseUrl } from './index'
describe('Fetch Service', () => {
  let url;
  beforeEach(() => {
    url = baseUrl
    FetchMock
      .get(url, { key: 'GET RESPONSE' })
      .head(url, { key: 'HEAD RESPONSE' })
      .put(url, { key: 'PUT RESPONSE' })
      .post(url, { key: 'POST RESPONSE' })
      .delete(url, { key: 'value' })
  })
  afterEach(() => {
    FetchMock.restore();
  })

  it('should default to a GET method', async () => {
    let response = await fetchService();
    expect(FetchMock.lastOptions(url).method).toEqual('GET');
    expect(response).toEqual({ key: 'GET RESPONSE'});
  })

  it('should return empty object on 204 response', async () => {
    let url = `${baseUrl}/some/path`;
    FetchMock.get(url, { status: 204 } );

    let response = await fetchService('/some/path');
    expect(response).toEqual({});
  })

  it('should throw an error on a status code of 400 or above', async () => {
    let url = `${baseUrl}/some/bad/path`;
    FetchMock.get(url, {status: 404})

    try {
      let response = await fetchService('/some/bad/path');
    } catch (exception) {
      expect(exception).toEqual({
        message: 'Failed with status code 404',
        status: 404
      });
    }
  })
})
