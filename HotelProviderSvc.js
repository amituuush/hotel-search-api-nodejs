const request = require('request');
const { BASE_URI } = require('./config');

function HotelProviderSvc() {
  this._storage = { results: [] };
  this._HOTEL_PROVIDERS = ['expedia', 'orbitz', 'priceline', 'travelocity', 'hilton'];
}

HotelProviderSvc.prototype = {

  fetch: function (resolve, reject) {
    let providerPromises = this.fetchProviders();
    Promise.all(providerPromises).then(resolve, reject);
  },

  fetchProviders: function () {
    let self = this;
    return this._listProviders().map((provider) => {
      return new Promise((resolve, reject) => {
        request.get(self._setUriOptions(provider), (err, res, body) => {
          if (err) { reject(err); }
          else {
            self._insert(body.results);
            resolve(body);
          }
        })
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
    // binary search (returns index)
    if (!hotel.ecstasy) { return undefined; }

    for (let i = 0; i <= this._storage.results.length; i++) {
      if (i === this._storage.results.length) { return i; }
      else if (hotel.ecstasy >= this._storage.results[i].ecstasy) {
        return i;
        break;
      }
    }
  },

  // if (!opts.provider) throw new Error('A provider must be supplied')
  // {
  //   uri: `${BASE_URI}/scrapers/${opts.provider}`,
  //   headers: Object.assigns({ 'User-Agent': 'request' }, opts.headers || {}),
  //   json: true
  // }

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

  failed: function (result) {
    this._failedProviders.push(result.providerName);
  }
};

module.exports = HotelProviderSvc;