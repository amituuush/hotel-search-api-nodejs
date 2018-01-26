const express = require('express');
const app = express();
const rp = require('request-promise');

function setOptionsUri(provider) {
  var options = {
    uri: `http://localhost:9000/scrapers/${provider}`,
    headers: { 'User-Agent': 'Request-Promise' },
    json: true,
  };
  return options;
}

hotelProviders = ['expedia', 'orbitz', 'priceline', 'travelocity', 'hilton'];

app.get('/hotels/search', function(req, res) {
  let resultsSum = { results: [] };
  results = [];

  hotelProviders.forEach(provider => {
    rp(setOptionsUri(provider))
      .then(function(response) {
        response.data.results.forEach(result => {
          results.push(result);
          console.log('result', results.length);
        });
        // console.log(results);
      })
      .catch(function(error) {
        console.log(error);
      });
  });
  console.log('results', results);
  res.send(results);
});

app.listen(8000, function() {
  console.log('Listening on port 8000!');
});

// config file?
