import React, { FC, useCallback, useState } from 'react';
import { Switch, Route } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { cn } from '@bem-react/classname';

import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { Product } from './pages/Product';
import { Delivery } from './pages/Delivery';
import { Contacts } from './pages/Contacts';
import { Helmet } from 'react-helmet';
import { Cart } from './pages/Cart';
import { useSelector } from 'react-redux';
import { ApplicationState } from './store';

const bem = cn('Application');

export const Application: FC = () => {
    const [collapsed, setCollapsed] = useState(true);
    const cart = useSelector((s: ApplicationState) => s.cart);

    const toggle = useCallback(() => setCollapsed(!collapsed), [setCollapsed, collapsed]);
    const hide = useCallback(() => {
        if (process.env.BUG_ID === '4') {
            setCollapsed(false);
        } else {
            setCollapsed(true);
        }
    }, [setCollapsed]);

    const count = Object.keys(cart).length;
    const cartLabel = count ? `Cart (${count})` : 'Cart';
    const navbarClass = collapsed ? 'collapse navbar-collapse' : 'navbar-collapse';

    return <div className={bem()}>
        <Helmet titleTemplate="%s — Example store" />
        <nav data-testid="navbar" className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="container">
                <Link data-testid="title" className={bem('Brand', ['navbar-brand'])} to="/">Example store</Link>
                <button className={bem('Toggler', ['navbar-toggler'])} aria-label="Toggle navigation" onClick={toggle}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={bem('Menu', [navbarClass])}>
                    <div className="navbar-nav">
                        <NavLink id="cat" data-testid="catalog" className="nav-link" activeClassName="active" to="/catalog" onClick={hide}>Catalog</NavLink>
                        <NavLink data-testid="delivery" className="nav-link" activeClassName="active" to="/delivery" onClick={hide}>Delivery</NavLink>
                        <NavLink data-testid="contacts" className="nav-link" activeClassName="active" to="/contacts" onClick={hide}>Contacts</NavLink>
                        <NavLink data-testid="cart" className="nav-link" activeClassName="active" to="/cart" onClick={hide}>{cartLabel}</NavLink>
                    </div>
                </div>
            </div>
        </nav>
        <div className="container pt-4">
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/catalog" exact component={Catalog} />
                <Route path="/catalog/:id" component={Product} />
                <Route path="/delivery" component={Delivery} />
                <Route path="/contacts" component={Contacts} />
                <Route path="/cart" component={Cart} />
            </Switch>
        </div>
    </div>;
};
