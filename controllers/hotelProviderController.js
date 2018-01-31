const HotelProviderSvc = require('../HotelProviderSvc');

exports.index = function (req, res) {
  const svc = new HotelProviderSvc()
  svc.fetch(resolve, reject);

  function resolve() { res.status(200).json(svc._storage) }
  function reject(error) { res.status(500).json(error) }
}



