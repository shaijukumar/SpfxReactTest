import { createContext, useMemo, useState } from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPService } from "../../../../Common/SPService";
import HomeStore from "../HomePage/HomeStore";
import AnnouncementStore from "../Announcements/AnnouncementStore";

export const portalRrootInit = (spContext: WebPartContext): any => {
  const [homeStore, setHomeStore] = useState(new HomeStore(spContext));
  const [announcementStore, setAnnouncementStore] = useState(
    new AnnouncementStore(spContext)
  );
  // const [homeStore, setHomeStore] = useState(new HomeStore(spContext));
  // const [homeStore, setHomeStore] = useState(new HomeStore(spContext));
  // const [homeStore, setHomeStore] = useState(new HomeStore(spContext));
  // const [homeStore, setHomeStore] = useState(new HomeStore(spContext));

  const contextValue = useMemo(() => {
    return {
      spContext,
      homeStore,
      announcementStore,
    };
  }, [spContext, homeStore, announcementStore]);

  return contextValue;
};

interface InitContextProps {
  spContext: WebPartContext;
  spService: any;
  homeStore: HomeStore;
  announcementStore: AnnouncementStore;
}

const PortalRootStore = createContext<InitContextProps>(undefined);
export default PortalRootStore;
