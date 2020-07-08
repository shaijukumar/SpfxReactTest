import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps,
} from "react-router-dom";

import ProductList from "../Product/ProductList";
import ProductEdit from "../Product/ProductEdit";
//###NavigationImport###

const TestOneNavigation: React.FC<RouteComponentProps> = (location) => {
  return (
    <Router>
      <div>
        <Switch>
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
            <ProductList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default TestOneNavigation;
