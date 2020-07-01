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

import "../../Style/PortalStyle.css";
import "../../Style/materialize.min.css";

import AnnouncementsDeails from "../Announcements/AnnouncementsDeails";
import AnnouncementList from "../Announcements/AnnouncementList";
import HomePage from "../HomePage/HomePage";

const PortalNavigation: React.FC<RouteComponentProps> = (location) => {
  return (
    <Router>
      <div>
        {/* <div>
          <div style={{ float: "left", paddingRight: "10px" }}>
            <Link to="/">HomePage</Link>{" "}
          </div>
          <div style={{ float: "left" }}>
            <Link to="/Welcome">Welcome</Link>
          </div>
        </div>
        <br /> */}
        <Switch>
          <Route path="/Announcement">
            <AnnouncementsDeails />
          </Route>
          <Route path="/Announcements">
            <AnnouncementList />
          </Route>

          {/* <Route
            key={location.key}
            path={['/NewTest1/', '/EditTest1/:id']}
            component={EditTest1} /> */}

          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default PortalNavigation;
