import React from 'react';
import { Provider } from 'react-redux';

import { ExampleApi, CartApi, MockApi, CartMockApi } from '../../src/client/api';
import { initStore } from '../../src/client/store';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom';
import { Cart } from '../../src/client/pages/Cart';
import { Application } from '../../src/client/Application';

const basename = '/';

describe('Корзина', () => {
    it('в шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней', async () => {
        const api = new MockApi(basename, [{ id: 777, name: "Anton", price: 100 }]);
        const cart = new CartMockApi({ 777: { name: "Anton", price: 100, count: 2 } });
        const store = initStore(api, cart);
        render(
            <BrowserRouter basename=''>
                <Provider store={store}>
                    <Application />
                </Provider>
            </BrowserRouter>
        );
        expect(screen.getByTestId('cart')).toContainHTML('Cart (1)')
    })

    it('в корзине должна отображаться таблица с добавленными в нее товарами', async () => {
        const api = new MockApi(basename, [{ id: 777, name: "Anton", price: 100 }]);
        const cart = new CartMockApi({ 777: { name: "Anton", price: 100, count: 2 } });
        const store = initStore(api, cart);
        render(
            <BrowserRouter basename=''>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        );
        await waitFor(() => {
            expect(screen.getByTestId('table')).toBeInTheDocument();
        })
    })

    it('для каждого товара должны отображаться название, цена, количество , стоимость, а также должна отображаться общая сумма заказа', async () => {
        const api = new MockApi(basename, [{ id: 777, name: "Anton", price: 100 }]);
        const cart = new CartMockApi({ 777: { name: "Anton", price: 100, count: 2 } });
        const store = initStore(api, cart);
        render(
            <BrowserRouter basename=''>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        );
        await waitFor(() => {
            expect(screen.getAllByRole('product')).toMatchSnapshot();
        })
    })

    it('в корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться', async () => {
        const api = new MockApi(basename, [{ id: 777, name: "Anton", price: 100 }]);
        const cart = new CartMockApi({ 777: { name: "Anton", price: 100, count: 2 } });
        const store = initStore(api, cart);
        render(
            <BrowserRouter basename=''>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        );
        const btn = screen.getByTestId('clear');
        expect(btn).toBeInTheDocument();
        fireEvent.click(btn);
        await waitFor(() => {
            expect(screen.queryByRole('product')).toBeNull();
        })
    })

    it('в корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться', async () => {
        const api = new MockApi(basename, [{ id: 777, name: "Anton", price: 100 }]);
        const cart = new CartMockApi({});
        const store = initStore(api, cart);
        render(
            <BrowserRouter basename=''>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        );
        await waitFor(() => {
            expect(screen.getByTestId('empty')).toBeInTheDocument();
        })
    })
})