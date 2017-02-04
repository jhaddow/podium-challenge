const token = 'koOheljmQX'
export const baseUrl = 'https://shakespeare.podium.co'

export default async function (url = '', options = { method: 'GET' }) {
  let headers = new Headers(options.headers || {})
  headers.set('Authorization', token);
  //if (options.body) {
  headers.set('Content-Type', 'application/json')
  //}

  let opts = {
    ...options,
    headers: headers
  }
  try {
    let response = await fetch(`${baseUrl}${url}`, opts)
    let results = await processResponse(response);
    return results;
  } catch (exception) {
    throw exception;
  }
}

async function processResponse(response) {
  if (!response.ok) {
    throw {
      message: `Failed with status code ${response.status}`,
      status: response.status
    }
  }

  if (response.status === 204) {
    return Promise.resolve({});
  }

  return await response.json();
}