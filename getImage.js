const https = require('https');

(async() => {
  const result = await request({
    host: 'api.giphy.com',
    path: '/v1/gifs/random?api_key=0UTRbFtkMxAplrohufYco5IY74U8hOes&tag=fail&rating=pg-13',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return result.data.image_original_url;
})();

function request (options) {
  let data = '';

  return new Promise((resolve, reject) => {
    const getRequest = https.request(options, (req) => {
      req.setEncoding('utf-8');

      req.on('data', (chunk) => {
        data += chunk;
      });
      req.on('end', () => resolve(JSON.parse(data)));
      req.on('error', reject);
    });

    if (options.body) {
      const body = JSON.stringify(options.body);

      getRequest.setHeader('Content-Length', body.length);
      getRequest.write(body);
    }

    getRequest.end();
  });
};
