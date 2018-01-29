const providerResultSvc = require('../providerResultSvc');

exports.index = function (req, res) {
  let promises = providerResultSvc.fetchProviders();
  Promise.all(promises).then((result) => {
    res.status(200).json(providerResultSvc.storage);
  });
}

// add error handling



