/**
* Allows binding events to be handle before app lifecycle end.
*/

const blocks = [];

/**
* Disposable Functions Factory
*/
const DisposableFnsFactory = {
  
  /**
  * @param {function} fn - wrap this function as a single use function
  * @return {{invoke: function}} - wrapped function, call invoke for single use only
  */
  build(fn) { 
    
    return {
      
      invoke() {
        if (typeof fn === 'function') {
          fn.call( null, ...arguments );
          fn = null;
        }
      }
    }  
  }
};

/**
* default calback to handle exit points
*/
function exitHandler( err ) {
  blocks.forEach( handle => {
    handle.fns.forEach( fn => {
      fn.invoke( err );
    });
  });
  
  // keep the original stack trace
  if (err) {
    console.error(err.stack);
  }
}

/**
* @description Callback for end of execution
*/
process.on( 'exit', exitHandler );

/**
* @description Catches ctrl + C
*/
process.on( 'SIGINT', exitHandler );

/**
* @description Catches errors
*/
process.on( 'uncaughtException', exitHandler );


module.exports = {

  /**
  * Init a new close handler, this lock all added fns to only one instane, 
  * that cna be displaced and have its callbacks removed
  */
  init() {
    
    var bId = `${Date.now()}x${Math.ceil(Math.random() * 100)}`;
    var handle = { id: bId, fns: [] };
    blocks.push(handle);
    
    return {
      
      /**
      * Add a new exit handle
      * @param {function} fn - Function to be called before exit
      */
      add(fn) {
        if (typeof fn !== 'function') {
          throw 'Fn should be a function';
        }
        handle.fns.push( DisposableFnsFactory.build( fn ) );
      },
      
      /* 
      * release all handles from this handler
      */
      release() {
        blocks.some( (handle, i ) => {
          if (handle.id === bId) {
            blocks.splice(i, 1);
            return true;
          }
        });
      }
    }
  },
  
  releaseAll() {
    blocks.splice(0, blocks.length);
  }
}
