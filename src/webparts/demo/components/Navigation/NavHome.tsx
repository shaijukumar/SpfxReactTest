import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
  HashRouter,
  PropsRoute,
  RouteComponentProps
} from "react-router-dom";

import Welcome from "../Welcome/Welcome";
import ViewTest1 from "../Test1/ViewTest1";
import EditTest1 from "../Test1/EditTest1";
import Test1 from "../Test1/ListTest1";

const NavHome: React.FC<RouteComponentProps> = (location) => {
  return (
    <Router>
      <div>
        <div>
          <div style={{ float: "left", paddingRight: "10px" }}>
            <Link to="/">List</Link>{" "}
          </div>
          <div style={{ float: "left" }}>
            <Link to="/NewTest1">New Item</Link>
          </div>
        </div>
        <br />

        <Switch>
          <Route path="/ViewTest1/:id">
            <ViewTest1 />
          </Route>

          {/* <Route path="/NewTest1">
            <EditTest1 />
          </Route> */}

          <Route
            key={location.key}
            path={['/NewTest1/', '/EditTest1/:id']}
            component={EditTest1} />

          <Route path="/">
            <Test1 />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default NavHome;
