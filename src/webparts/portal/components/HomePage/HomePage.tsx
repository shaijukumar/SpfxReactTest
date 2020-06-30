import * as React from "react";
import { useContext, useState } from "react";

import PortalRootStore from "../PortalRoot/PortalRootStore";
import Screen from "../PortalRoot/Screen";
import Welcome from "../Welcome/Welcome";
import Announcements from "../Announcements/Announcements";

export interface IListItemsProps {}

const HomePage: React.FC<IListItemsProps> = (props) => {
  const { homeStore, announcementStore } = useContext(PortalRootStore);
  const [load, setLoad] = useState(false);

  //const { spContext } = useContext(PortalBaseStore);

  React.useEffect(() => {
    homeStore.setLoading = setLoad;

    if (!homeStore.currentUser) {
      homeStore.updateHome(announcementStore);
    }
  }, [homeStore.updateHome]);

  return (
    <div>
      <Screen loading={load}>
        <Welcome />
        <Announcements />

        <div className="row divre-order">
          <div className="col s12 m12 l9">News</div>
          <div className="col s12 l3">CEO message</div>
        </div>
      </Screen>
    </div>
  );
};
export default HomePage;
