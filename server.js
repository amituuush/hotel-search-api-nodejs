const express = require('express');
const app = express();
const axios = require('axios');

app.get('/hotels/search', function(req, res) {
  axios
    .get('http://localhost:9000/scrapers/expedia')
    .then(function(response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
});

app.listen(8000, function() {
  console.log('Listening on port 8000!');
});

// config file?
