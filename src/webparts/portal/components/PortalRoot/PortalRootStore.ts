import { createContext, useMemo, useState } from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import WelcomeStore from "../Welcome/WelcomeStore";
import { SPService } from "../../../../Common/SPService";
import HomeStore from "../HomePage/HomeStore";

export const portalRrootInit = (spContext: WebPartContext): any => {
  const [homeStore, setHomeStore] = useState(new HomeStore(spContext));
  const [welcomeStore, setWelcomeStore] = useState(new WelcomeStore());

  const contextValue = useMemo(() => {
    return {
      spContext,
      homeStore,
      welcomeStore,
    };
  }, [spContext, homeStore, welcomeStore]);

  return contextValue;
};

interface InitContextProps {
  spContext: WebPartContext;
  spService: any;
  welcomeStore: WelcomeStore;
  homeStore: HomeStore;
}

const PortalRootStore = createContext<InitContextProps>(undefined);
export default PortalRootStore;
