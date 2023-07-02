import React from 'react';
import { Application } from "../src/client/Application";

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ExampleApi, CartApi } from '../src/client/api';
import { initStore } from '../src/client/store';
const basename = '/hw/store';

const api = new ExampleApi(basename);
const cart = new CartApi({});
const store = initStore(api, cart);

const TestComponent = function () {
    return (
        <BrowserRouter basename={basename}>
            <Provider store={store}>
                <Application />
            </Provider>
        </BrowserRouter>
    );
}

export default TestComponent;