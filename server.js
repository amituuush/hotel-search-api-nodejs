const express = require('express');
const app = express();
const request = require('request');

const providerResult = require('./providerResult.js');

app.get('/hotels/search', function (req, res) {

  const hotelProviders = ['expedia', 'orbitz', 'priceline', 'travelocity', 'hilton'];

  function setOptionsUri(provider) {
    var options = {
      uri: `http://localhost:9000/scrapers/${provider}`,
      headers: { 'User-Agent': 'request' },
      json: true,
    };
    return options;
  }

  function initialize() {
    return hotelProviders.map((provider) => {
      return new Promise(function (resolve, reject) {
        request.get(setOptionsUri(provider), function (err, res, body) {
          if (err) { reject(err); }
          else {
            providerResult.insert(body.results)
            resolve(body);
          }
        })
      }).catch(function (err) { console.error('err', err); });
    });
  }

  const sendResult = (result) => {
    res.status(200).json(providerResult.storage);
    // res.status(200).json(result);
  }

  function main() {
    let promises = initialize();
    Promise.all(promises).then(sendResult);
    // .then(_values => res = providerResult.result())
  }

  main();
});

app.listen(8000, function () {
  console.log('Listening on port 8000!');
});

// config file?
