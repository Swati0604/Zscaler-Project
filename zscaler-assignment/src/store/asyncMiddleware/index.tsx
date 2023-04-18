import { Middleware } from 'redux';
import { RootState } from '../index';

const asyncMiddleware: Middleware<{}, RootState> = store => next => action => {
  // Check if the action is async by checking for a promise in the payload
  if (action.payload && typeof action.payload.then === 'function') {
    // Dispatch the pending action to let the store know an async operation has started
    store.dispatch({ type: `${action.type}_PENDING` });

    // Call the async function and handle success and error cases
    return action.payload.then(
      (result: any) => {
        // Dispatch the success action with the result
        store.dispatch({ type: `${action.type}_SUCCESS`, payload: result });
      },
      (error: any) => {
        // Dispatch the error action with the error object
        store.dispatch({ type: `${action.type}_ERROR`, payload: error, error: true });
      }
    );
  }

  // If the action is not async, pass it on to the next middleware
  return next(action);
};

export default asyncMiddleware;
