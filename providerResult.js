module.exports = {
  storage: [],
  failedProviders: [],
  insert: function (list) {
    if (this.storage.length === 0) {
      this.storage = list;
      return;
    }
    list.forEach(el => {
      const index = this.findInsertionIndex(el);
      if (index) { this.storage.splice(index, 0, el); }
    });
  },
  results: function () {
    return this.storage;
  },
  failedProviders: function () {
    return this.failedProviders;
  },
  failed: function (result) {
    this.failedProviders.push(result.providerName);
  },
  findInsertionIndex: function (el) {
    // binary search (returns index)
    if (!el.ecstasy) { return undefined; }

    for (let i = 0; i <= this.storage.length; i++) {
      if (i === this.storage.length) { return i; }
      else if (el.ecstasy >= this.storage[i].ecstasy) {
        return i;
        break;
      }
    }
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