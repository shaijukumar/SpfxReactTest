import * as React from "react";
import { IShoppingRootProps } from "./IShoppingRootProps";
import * as jQuery from "jquery";
import ShoppingNavigation from "./ShoppingNavigation";

import ShoppingRootStore, { ShoppingRrootInit } from "./ShoppingRootStore";

function fixWorkbench(elem?: any, depth: number = 0) {
  //workbenchPageContent
  if (!elem && depth === 0)
    elem = document.getElementById("workbenchPageContent");
  if (!elem || depth > 20) return null;
  elem.style.padding = "0px 0px 0px 0px";
  elem.style.margin = "0px 0px 0px 0px";
  elem.style.width = "1500px";
  (Array as any)
    .from(elem.children)
    .map((child) => fixWorkbench(child, depth + 1));
}

const ShoppingRoot: React.FC<IShoppingRootProps> = (props) => {
  React.useEffect(() => {
    //     fixWorkbench();
    // jQuery("#workbenchPageContent").prop("style", "max-width: none");
    // jQuery(".SPCanvas-canvas").prop("style", "max-width: none");
    // jQuery(".CanvasZone").prop("style", "max-width: none");
    setTimeout(() => {
      var myElement = jQuery(
        'button[data-automation-id="workbench-command-bar-preview"]'
      ).click();
      jQuery(".dragIconContainer_90be1210").prop("style", "visibility: hidden");
    }, 100);
  }, []);

  // const [contextValue, SetContextValue] = React.useState(null);

  // React.useEffect(() => {
  //   SetContextValue(ShoppingRrootInit(props.spContext));
  // }, [ShoppingRrootInit]);

  return (
    <ShoppingRootStore.Provider value={ShoppingRrootInit(props.spContext)}>
      <ShoppingNavigation />
    </ShoppingRootStore.Provider>
  );
};

export default ShoppingRoot;
