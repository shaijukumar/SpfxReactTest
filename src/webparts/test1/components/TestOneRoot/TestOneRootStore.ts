import { createContext, useMemo, useState } from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";

import ProductStore from "../Product/ProductStore";
//###StoreImport###

export const TestOneRrootInit = (spContext: WebPartContext): any => {
  const [testStore, setProduct] = useState(new ProductStore(spContext));
  //###StoreStateDef###

  const contextValue = useMemo(() => {
    return {
      spContext,
      testStore,
      //###StoreName###
    };
  }, [
    spContext,
    testStore,
      //###StoreName###
  ]);

  return contextValue;
};

interface InitContextProps {
  spContext: WebPartContext;
  spService: any;
   testStore: ProductStore;
  //###StoreProps###
}

const TestOneRootStore = createContext<InitContextProps>(undefined);
export default TestOneRootStore;


