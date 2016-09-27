# Close Handler
*Execute callbacks on node app shutdown*

This lib makes easy to execute callbacks when some node app crashes or ends.

This is very useful to avoid locked states for example.

### 1. Install & configure

```bash
$ npm install --save close_handler
```

### 2. Create a handler instance
```js
var CloseHandler = require('closer_handler');
var handler = CloseHandler.init();
```

### 3. Using handler, register any callbacks to be called on shut down

```js
handler.add(function () {
  // do some code to unlock features
  mongoose.models.Car.update( { }, { $set: { locked: false } }).exec();
});

// or
handler.add(function (err) {
  // a logger
  Logger.log(`App exiting on ${Date.now()} due ${err}.`);
});
```

### Result

When the app for some reason is no longer running, **each** callback will be invoked **once** and **ONLY ONCE**!

### Deregistering callbacks

Sometimes a block of code, worker or loop ends, and the resources are no longer with lock states or something similar, so the callbacks are no longer need, so there is a `.release( )` instance method:

```js
// empty this handler
handler.release();
```

This remove **all callbacks from that particular instance** of the *CloseHandler*. But there is also a `.releaseAll( )` static method:

```js
// empty all handlers
CloseHandler.releaseAll();
```

This will remove **all callbacks from all handlers**.

### Callback function

If the app crashes, all callbacks function will receive the Error as a first argument. This will be a **Error** instance.
If the app just ends its life cycle, no arguments are passed.

### Async code

It's kind of impossible to execute and **wait the response** from an async function before the execution terminates after the kill signal. But you can execute async code if you do not need to do anything with the response. I've tested MongoDb update and insert queries with mongoose, and it works flawless, just call the function and pray :).
