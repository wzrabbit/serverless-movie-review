const fetch = require('node-fetch');
const SEARCH_MOVIES_ENDPOINT = 'https://api.themoviedb.org/3/search/movie';

exports.handler = async (event) => {
  try {
    console.log('OK START');
    const { queryStringParameters } = event;
    const parameters =
      Object.keys(queryStringParameters).join('&') + process.env.api_key;

    const URI = `${SEARCH_MOVIES_ENDPOINT}?${parameters}`;
    console.log('URI: ' + URI);
    const response = await fetch(URI);
    const { statusCode, statusText, ok, headers } = response;
    const body = JSON.stringify(await response.json());
    console.log('BODY', body);
    console.log(statusCode, statusText, ok, headers);
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
