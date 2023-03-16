const fetch = require('node-fetch');
const POPULAR_MOVIES_ENDPOINT = 'https://api.themoviedb.org/3/movie/popular';

exports.handler = async (event) => {
  try {
    const { queryStringParameters } = event;
    const apiKey = process.env.api_key.replace('API_KEY=', '');

    const parameterEntries = Object.entries(queryStringParameters);
    parameterEntries.push(['api_key', apiKey]);

    const queryString = parameterEntries
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    const URI = `${POPULAR_MOVIES_ENDPOINT}?${queryString}`;
    const response = await fetch(URI);
    const { statusCode, statusText, ok, headers } = response;
    const body = JSON.stringify(await response.json());

    headers['Access-Control-Allow-Origin'] = '*';

    return {
      statusCode: 200,
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
