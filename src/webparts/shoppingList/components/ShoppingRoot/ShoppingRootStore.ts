import { createContext, useMemo, useState } from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import CategoryStore from "../Category/CategoryStore";
import ProductStore from "../Product/ProductStore";
//###StoreImport###

export const ShoppingRrootInit = (spContext: WebPartContext): any => {
  const [categoryStore, setCategory] = useState(new CategoryStore(spContext));
  const [productStore, setProduct] = useState(new ProductStore(spContext));
  //###StoreStateDef###

  const contextValue = useMemo(() => {
    return {
      spContext,
      categoryStore,
      productStore,
      //###StoreName###
    };
  }, [
    spContext,
    categoryStore,
    productStore,
    //###StoreName###
  ]);

  return contextValue;
};

interface InitContextProps {
  spContext: WebPartContext;
  spService: any;
  categoryStore: CategoryStore;
  productStore: ProductStore;
  //###StoreProps###
}

const ShoppingRootStore = createContext<InitContextProps>(undefined);
export default ShoppingRootStore;
