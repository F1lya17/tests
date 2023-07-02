import React from 'react';
import TestComponent from '../TestComponent';
import axios from 'axios';
import { Provider } from 'react-redux';

import { ExampleApi, CartApi, MockApi, CartMockApi } from '../../src/client/api';
import { initStore } from '../../src/client/store';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Catalog } from '../../src/client/pages/Catalog';
import { BrowserRouter } from 'react-router-dom';

const basename = '/';

describe('Общие требования', () => {
    it('при нажатии на название переходим на главную страницу', () => {
        const application = (
            <TestComponent />
        )
        render(application);
        const name = screen.getByTestId("title");
        fireEvent.click(name);
        expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });

    it('в шапке отображаются ссылки на страницы магазина', () => {
        const application = (
            <TestComponent />
        )
        render(application);
        const catalog = screen.getByTestId("catalog").getAttribute("href");
        const delivery = screen.getByTestId("delivery").getAttribute("href");
        const contacts = screen.getByTestId("contacts").getAttribute("href");
        const cart = screen.getByTestId("cart").getAttribute("href");
        expect(catalog).toContain("/catalog");
        expect(delivery).toContain("/delivery");
        expect(contacts).toContain("/contacts");
        expect(cart).toContain("/cart");
    });
});


describe('Страницы', () => {
    it('в магазине должны быть страницы: главная, каталог, условия доставки, контакты', () => {
        const application = (
            <TestComponent />
        )
        render(application);
        const name = screen.getByTestId("title");
        fireEvent.click(name);
        expect(screen.getByTestId('home-page')).toBeInTheDocument();
        const catalog = screen.getByTestId("catalog");
        fireEvent.click(catalog);
        expect(screen.getByTestId('catalog-page')).toBeInTheDocument();
        const delivery = screen.getByTestId("delivery");
        fireEvent.click(delivery);
        expect(screen.getByTestId('delivery-page')).toBeInTheDocument();
        const contacts = screen.getByTestId("contacts");
        fireEvent.click(contacts);
        expect(screen.getByTestId('contacts-page')).toBeInTheDocument();
    })
})


describe('Каталог', () => {
    it('в каталоге должны отображаться товары, список которых приходит с сервера', async () => {
        const api = new MockApi(basename, [{ id: 777, name: "Anton", price: 100 }]);
        const cart = new CartMockApi({});
        const store = initStore(api, cart);
        render(
            <BrowserRouter basename=''>
                <Provider store={store}>
                    <Catalog />
                </Provider>
            </BrowserRouter>
        );
        await waitFor(() => screen.getByText('Anton'))
    })

    it('для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре', async () => {
        const api = new MockApi(basename, [{ id: 777, name: "Anton", price: 100 }]);
        const cart = new CartMockApi({});
        const store = initStore(api, cart);
        render(
            <BrowserRouter basename=''>
                <Provider store={store}>
                    <Catalog />
                </Provider>
            </BrowserRouter>
        );
        await waitFor(() => expect(screen.getAllByRole('card')).toMatchSnapshot())
    })
})