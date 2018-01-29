const request = require('request');

function HotelProviderSvc() {
  this._storage = {
    results: []
  };
  this.hotelProviders = ['expedia', 'orbitz', 'priceline', 'travelocity', 'hilton'];
}

HotelProviderSvc.prototype = {

  fetch: function () {
    const self = this;
    let promises = this.fetchProviders();

    Promise.all(promises).then((result) => {
      self.results();
    });
  },

  fetchProviders: function () {
    let self = this;
    return this.hotelProviders.map((provider) => {
      return new Promise(function (resolve, reject) {
        request.get(self._setUriOptions(provider), function (err, res, body) {
          if (err) { reject(err); }
          else {
            self._insert(body.results);
            resolve(body);
          }
        })
      }).catch(function (err) { console.error('err', err); });
    });
  },

  _insert: function (list) {
    if (this._storage.results.length === 0) {
      this._storage.results = list;
      return;
    }
    list.forEach(hotel => {
      const index = this._findInsertionIndex(hotel);
      if (index) { this._storage.results.splice(index, 0, hotel); }
    });
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

  _setUriOptions: function (provider) {
    var options = {
      uri: `http://localhost:9000/scrapers/${provider}`,
      headers: { 'User-Agent': 'request' },
      json: true,
    };
    return options;
  },

  results: function () { return this._storage; },

  failedProviders: function () { return this._failedProviders; },

  failed: function (result) {
    this._failedProviders.push(result.providerName);
  }
};

module.exports = HotelProviderSvc;

/*

[9,8,5,3,1]
[7,4,2]

if element is greater or equal to current storage el, return current index
if element is less than, next

if element is less than or equal to current storage el, return current index
if element is greater than, next

*/