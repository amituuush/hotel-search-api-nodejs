const request = require('request');

const providerResult = require('../providerResult');

const hotelProviders = ['expedia', 'orbitz', 'priceline', 'travelocity', 'hilton'];

function fetchProviders() {
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

function setOptionsUri(provider) {
  var options = {
    uri: `http://localhost:9000/scrapers/${provider}`,
    headers: { 'User-Agent': 'request' },
    json: true,
  };
  return options;
}

module.exports = function () {
  let promises = fetchProviders();
  Promise.all(promises).then(sendResult);
  // .then(_values => res = providerResult.result())
}

function sendResult(result) {
  // res.status(200).json(providerResult.storage);
  res.status(200).json(result);
}

