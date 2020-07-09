import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps,
} from "react-router-dom";

import ShoppingHomePage from "../ShoppingHomePage/ShoppingHomePage";
import CategoryList from "../Category/CategoryList";
import CategoryEdit from "../Category/CategoryEdit";
import ProductList from "../Product/ProductList";
import ProductEdit from "../Product/ProductEdit";
import ShoppingList from "../ShoppingList/ShoppingList";
//###NavigationImport###

const ShoppingNavigation: React.FC<RouteComponentProps> = (location) => {
  return (
    <Router>
      <div>
        <Switch>
          <Route
            key={location.key}
            path={["/Shop/"]}
            component={ShoppingList}
          />

          <Route
            key={location.key}
            path={["/NewCategory/", "/Category/:id"]}
            component={CategoryEdit}
          />
          <Route
            key={location.key}
            path={["/CategoryList/"]}
            component={CategoryList}
          />
          <Route
            key={location.key}
            path={["/NewProduct/", "/Product/:id"]}
            component={ProductEdit}
          />
          <Route
            key={location.key}
            path={["/ProductList/"]}
            component={ProductList}
          />
          {/* ##Navigation## */}

          <Route path="/">
            <ShoppingList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default ShoppingNavigation;
