import React from "react";
import { Route, Switch } from "react-router";
import { Home } from "./pages/Home";
import { Catalog } from "./pages/Catalog";
import { Product } from "./pages/Product";
import { Delivery } from "./pages/Delivery";
import { Contacts } from "./pages/Contacts";
import { Cart } from "./pages/Cart";

const AppRouter = function () {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/catalog" exact component={Catalog} />
            <Route path="/catalog/:id" component={Product} />
            <Route path="/delivery" component={Delivery} />
            <Route path="/contacts" component={Contacts} />
            <Route path="/cart" component={Cart} />
        </Switch>
    );
}

export default AppRouter;