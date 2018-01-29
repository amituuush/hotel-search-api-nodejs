const express = require('express');
const app = express();
const request = require('request');

const hotelProviderController = require('./controllers/hotelProviderController');

app.get('/hotels/search', hotelProviderController.index)

app.listen(8000, function () {
  console.log('Listening on port 8000!');
});

// error handling
// check for null and standard http response codes
// separation of concerns, don't write code all in one function
// add readme explaining what you did, how to run the code and what improvements you'd make
// good naming of variables
// if one hotel api is down, shouldn't mess up other ones
// don't want to wait for expedia to return before hitting orbitz
// add comments if necessary
// need node v8

// config file?



