import * as React from "react";
import { useContext, useState } from "react";
import PortalBaseStore from "../PortalRoot/PortalBaseStore";

//import "../../Style/PortalStyle.css";
import Screen from "../PortalRoot/Screen";
import Welcome from "../Welcome/Welcome";
import PortalRootStore from "../PortalRoot/PortalRootStore";

export interface IListItemsProps {}

const HomePage: React.FC<IListItemsProps> = (props) => {
  const { homeStore } = useContext(PortalRootStore);
  const [load, setLoad] = useState(false);

  //const { spContext } = useContext(PortalBaseStore);

  React.useEffect(() => {
    homeStore.setLoading = setLoad;
    if (!homeStore.currentUser) {
      homeStore.updateHome();
    }
  }, [homeStore.updateHome]);

  return (
    <div>
      <Screen loading={load}>
        <Welcome />
      </Screen>
    </div>
  );
};
export default HomePage;
