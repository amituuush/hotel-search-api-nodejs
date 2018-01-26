const express = require('express');
const app = express();
const rp = require('request-promise');


app.get('/hotels/search', function (req, res) {

  function setOptionsUri(provider) {
    var options = {
      uri: `http://localhost:9000/scrapers/${provider}`,
      headers: { 'User-Agent': 'Request-Promise' },
      json: true,
    };
    return options;
  }

  const hotelProviders = ['expedia', 'orbitz', 'priceline', 'travelocity', 'hilton'];
  let data = { results: [] };

  (function next(index) {
    if (index === hotelProviders.length) { // No items left
      res.status(200).json(data);
      return;
    }
    let provider = hotelProviders[index];
    rp(setOptionsUri(provider))
      .then(function (response) {
        response.results.forEach(result => {
          data.results.push(result);
        });
        next(index + 1);
      })
      .catch(function (error) { console.log(error); });
  })(0);


  // hotelProviders.forEach(provider => {
  //   rp(setOptionsUri(provider))
  //     .then(function (response) {
  //       response.results.forEach(result => {
  //         resultsSum.results.push(result);
  //       });
  //       // console.log('stuff', results);
  //       // console.log('length', results.length);
  //     })
  //     .catch(function (error) { console.log(error); });
  // });
  // res.status(200).json(resultsSum);


});

app.listen(8000, function () {
  console.log('Listening on port 8000!');
});

// config file?
