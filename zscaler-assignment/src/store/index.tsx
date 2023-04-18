/* eslint-disable no-undef */
//@ts-nocheck
import {
    applyMiddleware,
    compose,
    createStore
} from 'redux';

import thunkMiddleware from 'redux-thunk';
import asyncMiddleware from './asyncMiddleware';

import reducerModule from './reducerModule';

const storeEnhancers = [
    applyMiddleware(thunkMiddleware, asyncMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //__BROWSER__ && __LOCAL__ && window.devToolsExtension && window.devToolsExtension(),
].filter(Boolean);

let store = createStore(
    reducerModule,
    compose(...storeEnhancers)
);

export function createClientStore(initialState) {
    store = createStore(
        reducerModule,
        initialState,
        compose(...storeEnhancers)
    );
    return store;
}

export function getClientStore() {
    return store;
}

export type RootState = {
    attackerDetails: AttackerDetailsType
}

export type AttackerDetailsType = {
    isLoading: boolean,
    isError: boolean,
    data: any
}