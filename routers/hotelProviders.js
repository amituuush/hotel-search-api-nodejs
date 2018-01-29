const express = require('express');
const app = express();
const Orders = require('../models/orders');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const create = require('../methods/create');
const read = require('../methods/read');

app.get('/hotels/search', function (req, res) {
  read({}, function (err, listOfOrders) {
    if (err) {
      res.json(err)
    }
    res.json(listOfOrders);
    res.status(200);
  })
})