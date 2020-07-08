import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps,
} from "react-router-dom";

//###NavigationImport###

const _WpName_Navigation: React.FC<RouteComponentProps> = (location) => {
  return (
    <Router>
      <div>
        <Switch>
          {/* ##Navigation## */}

          <Route path="/">{/* <##HomeCtl## /> */}</Route>
        </Switch>
      </div>
    </Router>
  );
};

export default _WpName_Navigation;
