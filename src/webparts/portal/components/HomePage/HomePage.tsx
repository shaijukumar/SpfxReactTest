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
      </Screen>
    </div>
  );
};
export default HomePage;
