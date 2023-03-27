const fetch = require('node-fetch');
const SEARCH_MOVIES_ENDPOINT = 'https://api.themoviedb.org/3/search/movie';

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  try {
    const { queryStringParameters } = event;
    const apiKey = process.env.api_key.replace('API_KEY=', '');

    const parameterEntries = Object.entries(queryStringParameters);
    parameterEntries.push(['api_key', apiKey]);

    const queryString = parameterEntries
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    const URI = `${SEARCH_MOVIES_ENDPOINT}?${queryString}`;
    const response = await fetch(URI);
    const body = JSON.stringify(await response.json());

    if (!response.ok) {
      console.log('response was not ok');
      console.log(response);
      return {
        statusCode: response.status,
        success: false,
        body,
        headers,
      };
    }

    return {
      statusCode: 200,
      success: true,
      body,
      headers,
    };
  } catch (error) {
    console.log('Exception!', error);
    return {
      statusCode: 404,
      statusText: error.message,
      success: false,
      headers,
    };
  }
};
