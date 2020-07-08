import { createContext, useMemo, useState } from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";

//###StoreImport###

export const _WpName_RrootInit = (spContext: WebPartContext): any => {
  //###StoreStateDef###

  const contextValue = useMemo(() => {
    return {
      spContext,
      //###StoreName###
    };
  }, [
    spContext,
    //###StoreName###
  ]);

  return contextValue;
};

interface InitContextProps {
  spContext: WebPartContext;
  spService: any;
  //###StoreProps###
}

const _WpName_RootStore = createContext<InitContextProps>(undefined);
export default _WpName_RootStore;
