import { createContext, useMemo, useState } from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import WelcomeStore from "../Welcome/WelcomeStore";
import NewsStore from "../News/NewsStore";

import TestStore from "../Test1/TestStore";

export const rootInit = (spContext: WebPartContext): any => {
  const [meTest, setMeTest] = useState("-");
  const [welcomeStore, setWelcomeStore] = useState(new WelcomeStore());
  const [newsStore, setNewsStore] = useState(new NewsStore());

  const [testStore, setTestStore] = useState(new TestStore(spContext, "Test1"));

  const contextValue = useMemo(() => {
    return {
      spContext,
      meTest,
      setMeTest,
      welcomeStore,
      newsStore,
      testStore,      
    };
  }, [spContext, meTest, setMeTest, welcomeStore, newsStore, testStore]);

  return contextValue;
};

interface InitContextProps {
  spContext: WebPartContext;
  meTest: string;
  setMeTest: any;
  welcomeStore: WelcomeStore;
  newsStore: NewsStore;
  testStore: TestStore;
}

const RootStore = createContext<InitContextProps>(undefined);
export default RootStore;
