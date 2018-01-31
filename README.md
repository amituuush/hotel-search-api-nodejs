# Hotel Search API
* Built in `Node.js` using `Express` as a framework
* `request` as an http library
* `ES6 Promises` to handle asynchronous requests

## Installation and Dependencies
1. Clone [Python server](https://github.com/Hipmunk/hipproblems/tree/master/hotel_search) locally and follow instructions in `README.md` to get server up and running.
1. Clone this repo locally
2. Run `npm install`
2. Run `npm start`
3. Navigate to [http://localhost:8000/hotels/search](http://localhost:8000/hotels/search)


## Other Considerations and Possible Improvements
The API exposes one endpoint, `GET /hotels/search`, which returns a list of hotels sorted by `ecstasy` (`int` property on each hotel object), which sends the request to the `hotelProviderController`, calling the `index` method.

`hotelProviderController.index` creates an instance of `HotelProviderSvc`, which has a simple public interface: `fetch()`. All private methods/properties are prepended with `_`. `fetch` calls `fetchProviders`, which maps through the private `_HOTEL_PROVIDERS` array to make asynchronous requests to all 5 hotel providers (Expedia, Orbitz, Priceline, Travelocity, Hilton). Upon successful response, `body.results` (array) are passed to the `_insert` method, which serves to insert the `body.results` in `_storage.results`. To keep `_storage.results` sorted, each item in `body.results` is passed to `_findInsertionIndex`, which iterates through the current `_storage.results` and finds the proper index at which the item needs to be inserted to keep the list sorted by `ecstasy`.

Each request is wrapped in a promise and all requests are eventually passed to `Promise.all()`, which returns a single promise once all passed promises have resolved. As mentioned before, all requests are asynchronous and therefore "non-blocking". Additionally, by chaining `.catch()` to each promise, failed requests are handled gracefully and do not impact the response sent to the client. Failed requests are added to `_failedProviders` (array).

Once all requests have been resolved, the accumulated `_storage` is sent back to the client.

Additional hotel providers would simply need to be added to the `_HOTEL_PROVIDERS` array.



if promise doesn't resolve

reusability of hotelprovidersvc


hoteprovider service

error handling

**Directory structure**:


**Improvements**: iterating through storage, would be better using binary search to find index for log(n)?