const request = require('request');

module.exports = {
  storage: {
    results: []
  },
  hotelProviders: ['expedia', 'orbitz', 'priceline', 'travelocity', 'hilton'],
  setUriOptions: function (provider) {
    var options = {
      uri: `http://localhost:9000/scrapers/${provider}`,
      headers: { 'User-Agent': 'request' },
      json: true,
    };
    return options;
  },
  fetchProviders: function () {
    let self = this;
    return this.hotelProviders.map((provider) => {
      return new Promise(function (resolve, reject) {
        request.get(self.setUriOptions(provider), function (err, res, body) {
          if (err) { reject(err); }
          else {
            self.insert(body.results);
            resolve(body);
          }
        })
      }).catch(function (err) { console.error('err', err); });
    });
  },
  insert: function (list) {
    if (this.storage.results.length === 0) {
      this.storage.results = list;
      return;
    }
    list.forEach(el => {
      const index = this.findInsertionIndex(el);
      if (index) { this.storage.results.splice(index, 0, el); }
    });
  },
  findInsertionIndex: function (el) {
    // binary search (returns index)
    if (!el.ecstasy) { return undefined; }

    for (let i = 0; i <= this.storage.results.length; i++) {
      if (i === this.storage.results.length) { return i; }
      else if (el.ecstasy >= this.storage.results[i].ecstasy) {
        return i;
        break;
      }
    }
  },
  failedProviders: [],
  results: function () {
    return this.storage;
  },
  failedProviders: function () {
    return this.failedProviders;
  },
  failed: function (result) {
    this.failedProviders.push(result.providerName);
  }
}

/*

[9,8,5,3,1]
[7,4,2]

if element is greater or equal to current storage el, return current index
if element is less than, next

if element is less than or equal to current storage el, return current index
if element is greater than, next

*/