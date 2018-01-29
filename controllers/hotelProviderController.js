const HotelProviderSvc = require('../HotelProviderSvc');

exports.index = function (req, res) {
  const svc = new HotelProviderSvc()
  let results = svc.fetch();
  console.log('results', results);
  res.status(200).json(results);
}

// let promises = providerResultSvc.fetchProviders();
// add error handling



