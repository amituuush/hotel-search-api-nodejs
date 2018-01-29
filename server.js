const express = require('express');
const app = express();
const rp = require('request-promise');
const request = require('request');

const providerResult = require('./providerResult.js');

app.get('/hotels/search', function (req, res) {

  let data = { results: [] };

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
            // providerResult.storage.push(body);
            // console.log('bodyResults', body.results);
            providerResult.insert(body.results)
            resolve(body);
          }
        })
      }).catch(function (err) { console.error('err', err); });
    });
  }

  const sendResult = (result) => {
    // console.log(providerResult.storage);
    res.status(200).json(providerResult.storage);
    // res.status(200).json(result);
  }

  function main() {
    let promises = initialize();
    Promise.all(promises).then(sendResult);
    // .then(_values => res = providerResult.result())
  }

  main();

  // var p1 = new Promise(function (resolve, reject) {
  //   resolve('one');
  // })
  //   .catch(function (err) {
  //     console.error('err', err);
  //   });

  // var p2 = new Promise(function (resolve, reject) {
  //   reject('two was rejected');
  // })
  //   .catch(function (err) {
  //     console.error('err', err);
  //   });

  // var p3 = new Promise(function (resolve, reject) {
  //   resolve('three');
  // })
  //   .catch(function (err) {
  //     console.error('err', err);
  //   });

  // /////////

  // var endpoints = [
  //   'http://example.com/api/one',
  //   'http://example.com/api/two',
  //   'http://example.com/api/three',
  //   'http://example.com/api/four'
  // ];

  // var message = "";

  // promise1 = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     message += "my";
  //     resolve(message);
  //   }, 2000)
  // })

  // promise2 = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     message += " first";
  //     resolve(message);
  //   }, 2000)
  // })

  // promise3 = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     message += " promise";
  //     resolve(message);
  //   }, 2000)
  // })




  // let data = { results: [] };

  // (function next(index) {
  //   if (index === hotelProviders.length) { // No providers left
  //     res.status(200).json(data);
  //     return;
  //   }

  //   let provider = hotelProviders[index];

  //   rp(setOptionsUri(provider))
  //     .then(function (onse) {
  //       response.results.forEach(result => {
  //         data.results.push(result);
  //       });
  //       next(index + 1);
  //     })
  //     .catch(function (error) { console.log(error); });
  // })(0);

  // router, controller

  // you’ll likely also want to create a few models
  // at least a `Provider` class
  // don’t want to operate with raw JSON in your client
  // that’s a big no-no

  // error handling
  // check for null and standard http response codes
  // separation of concerns, don't write code all in one function
  // add readme explaining what you did, how to run the code and what improvements you'd make
  // good naming of variables
  // if one hotel api is down, shouldn't mess up other ones
  // don't want to wait for expedia to return before hitting orbitz
  // add comments if necessary
  // need node v8

});

app.listen(8000, function () {
  console.log('Listening on port 8000!');
});

// config file?
