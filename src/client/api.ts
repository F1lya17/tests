import axios, { AxiosResponse } from 'axios';
import { CartState, CheckoutFormData, CheckoutResponse, Product, ProductShortInfo } from '../common/types';

export abstract class AbstractApi {
    constructor(protected readonly basename: string) {

    }

    abstract getProducts(): Promise<AxiosResponse<ProductShortInfo[]>>

    abstract getProductById(id: number): Promise<AxiosResponse<Product | null>>

    abstract checkout(form: CheckoutFormData, cart: CartState): Promise<AxiosResponse<CheckoutResponse>>
}

export class MockApi extends AbstractApi {
    constructor(protected readonly basename: string, private readonly products: ProductShortInfo[]) {
        super(basename);
        products = products;
    }

    getProducts(): Promise<AxiosResponse<ProductShortInfo[], any>> {
        return new Promise((resolve): void => {
            resolve({
                status: 200,
                statusText: "good",
                data: this.products,
                headers: {},
                config: {},
            })
        });
    }

    getProductById(id: number): Promise<AxiosResponse<Product, any>> {
        return new Promise((resolve) => {
        });
    }

    checkout(form: CheckoutFormData, cart: CartState): Promise<AxiosResponse<CheckoutResponse, any>> {
        return new Promise((resolve) => {
        });
    }
}

export class ExampleApi extends AbstractApi {
    constructor(protected readonly basename: string) {
        super(basename);
    }
    async getProducts() {
        let res = await axios.get<ProductShortInfo[]>(`${this.basename}/api/products`);
        return res;
    }

    async getProductById(id: number) {
        return await axios.get<Product>(`${this.basename}/api/products/${id}`);
    }

    async checkout(form: CheckoutFormData, cart: CartState) {
        return await axios.post<CheckoutResponse>(`${this.basename}/api/checkout`, { form, cart });
    }
}

export const LOCAL_STORAGE_CART_KEY = 'example-store-cart';

export abstract class CartAbstractApi {
    constructor(protected readonly cart: CartState) {
        this.cart = cart
    }
    abstract getState(): CartState

    abstract setState(cart: CartState): void
}

export class CartMockApi extends CartAbstractApi {
    getState() {
        return this.cart;
    }
    setState(cart: CartState) { }
}

export class CartApi extends CartAbstractApi {
    getState(): CartState {
        try {
            const json = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
            return JSON.parse(json) as CartState || {};
        } catch {
            return {};
        }
    }

    setState(cart: CartState) {
        localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
    }
}