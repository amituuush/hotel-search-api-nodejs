const express = require('express');
const app = express();

const hotelProviderController = require('./controllers/hotelProviderController');

app.get('/hotels/search', hotelProviderController.index)

app.listen(8000, function () {
  console.log('Listening on port 8000!');
});
