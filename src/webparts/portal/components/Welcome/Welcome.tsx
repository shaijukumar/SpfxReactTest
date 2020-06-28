import * as React from "react";
import { useContext, useState, useEffect } from "react";
import * as moment from "moment";

import "../../Style/PortalStyle.css";
import PortalRootStore from "../PortalRoot/PortalRootStore";

export interface IListItemsProps {}

const Welcome: React.FC<IListItemsProps> = (props) => {
  const { homeStore } = useContext(PortalRootStore);

  const [todayWeek, setTodayWeek] = useState("Day");
  const [msg, setMsg] = useState(
    moment().format("a") === "pm" ? "Welcome-AMMessage" : "Welcome-PMMessage"
  );

  useEffect(() => {
    if (homeStore.variations && homeStore.currentUser) {
      homeStore.variations.then((v) => {
        debugger;
        let q = "";
        moment().format("a") == "pm"
          ? (q = "Welcome-PMMessage")
          : (q = "Welcome-AMMessage");
        setMsg(`${v[q]} ${homeStore.currentUser.DisplayName}`);
      });
    }
  }, [homeStore.currentUser, homeStore.variations]);

  return (
    <div className="welcomeWrapper">
      <div className="row">
        <div className="col s12 m4 left-align ">{msg}</div>

        <div className="col s12 m4"></div>

        <div className="col s12 m4 right-align hide-on-med-and-down" dir="ltr">
          {todayWeek} ,
          <span className="date">{moment().format("DD/MM/yyyy")}</span>
        </div>
      </div>
    </div>
  );
};
export default Welcome;
