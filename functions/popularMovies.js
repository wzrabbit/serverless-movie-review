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
    const body = JSON.stringify(await response.json());

    if (!response.ok) {
      return {
        status: response.status,
        success: false,
        body,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      };
    }

    response.headers['Access-Control-Allow-Origin'] = '*';
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST';
    response.headers['Access-Control-Allow-Headers'] =
      'Content-Type, Authorization';

    return {
      status: 200,
      success: true,
      body,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (error) {
    return {
      status: 404,
      statusText: error.message,
      success: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};
