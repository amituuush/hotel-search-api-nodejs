# Hotel Search API
* Built in `Node.js` using `Express` as a web framework
* `request` as an http library
* `ES6 Promise`s to handle asynchronous requests

## Installation and Dependencies
1. Clone [Python server](https://github.com/Hipmunk/hipproblems/tree/master/hotel_search) locally and follow instructions in `README.md` to get server up and running.
1. Clone this repo locally
2. Run `npm install` (install [nodemon](https://github.com/remy/nodemon)) if you don't have it.
2. Run `npm start`
3. Navigate to [http://localhost:8000/hotels/search](http://localhost:8000/hotels/search)


## Overview and Possible Improvements
The API exposes one endpoint, `GET /hotels/search`, which returns a list of hotels sorted by `ecstasy` (`int` property on each hotel object), which sends the request to the `hotelProviderController`, calling the `index` method.

`hotelProviderController.index` creates an instance of `HotelProviderSvc`, which has a simple public interface: `fetch()`. `fetch` calls a chain of private methods (all prepended with `_`) which map through the private `_HOTEL_PROVIDERS` array to make asynchronous requests to all 5 hotel providers (Expedia, Orbitz, Priceline, Travelocity, Hilton). A successful response is passed to the `_insert` method, which serves to insert the response in `_storage`.

To keep `_storage` sorted, each item in the response is passed to `_findInsertionIndex`, which iterates through the current `_storage` and finds the proper index at which the item needs to be inserted at to keep the list sorted by `ecstasy`. This is a linear time operation (O(n)); however, this could be improved to O(log n) using binary search to find the proper index at which to insert the item.

Each request is wrapped in a promise and all requests are eventually passed to `Promise.all()`, which returns a single promise. As mentioned before, all requests are asynchronous and therefore "non-blocking". Additionally, by calling `reject()` when a request fails and chaining `.catch()` to each promise, failed requests are handled gracefully and do not impact the response sent to the client. Failed requests are added to `_failedProviders` (array).

Once all requests have been resolved, the accumulated `_storage` is sent back to the client.

If additional hotel providers were needed, they would simply need to be added to the `_HOTEL_PROVIDERS` array.

Other improvements that could be made are creating a hotel model (amongst other models) and using a database for persistence to normalize the data and provide a common abstraction for interfacing with hotel or provider data. Due to a time constraint and the nature of the instructions, I opted to hold off from implementing a model and database.
