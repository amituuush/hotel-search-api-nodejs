const HotelProviderSvc = require('../HotelProviderSvc');

exports.index = function (req, res) {
  const svc = new HotelProviderSvc()
  function resolve(results) { res.status(200).json(svc._storage) }
  function reject(error) { res.status(500).json(error) }

  svc.fetch(resolve, reject);
}

// add error handling



