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
        statusCode: response.statusCode,
        success: false,
        body,
      };
    }

    response.headers['Access-Control-Allow-Origin'] = '*';

    return {
      statusCode: 200,
      success: true,
      body,
    };
  } catch (error) {
    return {
      statusCode: 404,
      statusText: error.message,
      success: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};
