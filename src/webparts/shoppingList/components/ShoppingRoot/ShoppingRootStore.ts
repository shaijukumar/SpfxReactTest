import { createContext, useMemo, useState } from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import CategoryStore from "../Category/CategoryStore";
//import { SPService } from "../../../../Common/SPService";

export const ShoppingRrootInit = (spContext: WebPartContext): any => {
  const [categoryStore, setCategory] = useState(new CategoryStore(spContext));
  // const [announcementStore, setAnnouncementStore] = useState(
  //   new AnnouncementStore(spContext)
  // );
  // const [homeStore, setHomeStore] = useState(new HomeStore(spContext));
  // const [homeStore, setHomeStore] = useState(new HomeStore(spContext));
  // const [homeStore, setHomeStore] = useState(new HomeStore(spContext));
  // const [homeStore, setHomeStore] = useState(new HomeStore(spContext));

  const contextValue = useMemo(() => {
    return {
      spContext,
      categoryStore,
      //announcementStore,
    };
  }, [
    spContext,
    categoryStore,
    //announcementStore
  ]);

  return contextValue;
};

interface InitContextProps {
  spContext: WebPartContext;
  spService: any;
  categoryStore: CategoryStore;
  //announcementStore: AnnouncementStore;
}

const ShoppingRootStore = createContext<InitContextProps>(undefined);
export default ShoppingRootStore;
