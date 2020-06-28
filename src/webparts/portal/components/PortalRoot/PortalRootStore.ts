import { createContext, useMemo, useState } from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import WelcomeStore from "../Welcome/WelcomeStore";

export const portalRrootInit = (spContext: WebPartContext): any => {
  const [meTest, setMeTest] = useState("-");
  const [welcomeStore, setWelcomeStore] = useState(new WelcomeStore());

  const contextValue = useMemo(() => {
    return {
      spContext,
      welcomeStore,
    };
  }, [spContext, meTest, setMeTest, welcomeStore]);

  return contextValue;
};

interface InitContextProps {
  spContext: WebPartContext;
  welcomeStore: WelcomeStore;
}

const PortalRootStore = createContext<InitContextProps>(undefined);
export default PortalRootStore;
