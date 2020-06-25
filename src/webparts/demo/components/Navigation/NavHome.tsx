import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
  HashRouter,
  PropsRoute,
} from "react-router-dom";

import Welcome from "../Welcome/Welcome";
import News from "../News/News";
import Test1 from "../Test1/Test1";

const NavHome: React.FC = () => {
  return (
    <Router>
      <div>
        <div>
          <div style={{ float: "left", paddingRight: "10px" }}>
            <Link to="/">List</Link>{" "}
          </div>
          <div style={{ float: "left" }}>
            <Link to="/newItem">New Item</Link>
          </div>
        </div>
        <br />

        <Switch>
          <Route path="/newItem">
            <News />
          </Route>
          <Route path="/">
            <Test1 />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default NavHome;
