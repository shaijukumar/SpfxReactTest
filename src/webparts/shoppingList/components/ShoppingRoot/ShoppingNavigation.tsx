import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
  HashRouter,
  PropsRoute,
  RouteComponentProps,
} from "react-router-dom";

import CategoryEdit from "../Category/CategoryEdit";

import "../../Style/ShoppingStyle.css";

import ShoppingHomePage from "../ShoppingHomePage/ShoppingHomePage";
import CategoryList from "../Category/CategoryList";

const ShoppingNavigation: React.FC<RouteComponentProps> = (location) => {
  return (
    <Router>
      <div>
        <Switch>
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

          <Route path="/">
            <CategoryList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default ShoppingNavigation;
