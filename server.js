const express = require('express');
const app = express();

const hotelProviderController = require('./controllers/hotelProviderController');

app.get('/hotels/search', hotelProviderController.index)

app.listen(8000, function () {
  console.log('Listening on port 8000!');
});

// error handling
// check for null and standard http response codes
// add readme explaining what you did, how to run the code and what improvements you'd make
// good naming of variables
