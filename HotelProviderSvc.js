const request = require('request');
const { BASE_URI } = require('./config');

function HotelProviderSvc() {
  this._storage = { results: [] };
  this._HOTEL_PROVIDERS = ['expedia', 'orbitz', 'priceline', 'travelocity', 'hilton'];
  this._failedProviders = [];
}

HotelProviderSvc.prototype = {

  fetch: function (resolve, reject) {
    let providerPromises = this._fetchProviders();
    Promise.all(providerPromises).then(resolve, reject);
  },

  _fetchProviders: function () {
    let self = this;
    return this._listProviders().map((provider) => {
      return new Promise((resolve, reject) => {
        request(self._setUriOptions(provider), function (err, res, body) {
          if (body === null || body === undefined) {
          } else if (res.statusCode === 200) {
            self._insert(body.results);
            resolve(body.results);
          }
          else {
            reject(res);
            self._failed(res);
          }
        });
      }).catch((err) => { console.error('err', err); });
    });
  },

  _insert: function (list) {
    if (this._storage.results.length === 0) {
      this._storage.results = list;
    } else {
      list.forEach(hotel => {
        const index = this._findInsertionIndex(hotel);
        if (index) { this._storage.results.splice(index, 0, hotel); }
      });
    }
  },

  _findInsertionIndex: function (hotel) {
    if (!hotel.ecstasy) { return undefined; }

    for (let i = 0; i <= this._storage.results.length; i++) {
      if (i === this._storage.results.length) { return i; }
      else if (hotel.ecstasy >= this._storage.results[i].ecstasy) {
        return i;
        break;
      }
    }
  },

  _setUriOptions: function (provider) {
    return {
      uri: `${BASE_URI}/scrapers/${provider}`,
      headers: { 'User-Agent': 'request' },
      json: true,
    };
  },

  _listProviders: function () {
    return this._HOTEL_PROVIDERS;
  },

  results: function () { return this._storage; },

  failedProviders: function () { return this._failedProviders; },

  _failed: function (res) {
    this._failedProviders.push(res);
  }
};

module.exports = HotelProviderSvc;