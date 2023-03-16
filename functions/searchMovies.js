const fetch = require('node-fetch');
const SEARCH_MOVIES_ENDPOINT = 'https://api.themoviedb.org/3/search/movie';

exports.handler = async (event) => {
  try {
    console.log('OK START');
    const { queryStringParameters } = event;
    const parameters = Object.entries(queryStringParameters)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
      .concat(`&api_key=${process.env.API_KEY}`);

    const URI = `${SEARCH_MOVIES_ENDPOINT}?${parameters}`;
    const response = await fetch(URI);
    const { statusCode, statusText, ok, headers } = response;
    const body = JSON.stringify(await response.json());
    console.log('BODY', body);

    headers['Access-Control-Allow-Origin'] = '*';

    return {
      statusCode,
      statusText,
      ok,
      headers,
      body,
    };
  } catch (error) {
    return {
      statusCode: 404,
      statusText: error.message,
      ok: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};
