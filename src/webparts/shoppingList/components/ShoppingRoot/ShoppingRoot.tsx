import * as React from "react";

import "../../Style/ShoppingStyle.css";

import { IRootProps } from "../../../../Common/IRootProps";
import ShoppingNavigation from "./ShoppingNavigation";
import ShoppingRootStore, { ShoppingRrootInit } from "./ShoppingRootStore";
import { showWorkbenchPreviewMode } from "../../../../Common/WorkbenchView";

const ShoppingRoot: React.FC<IRootProps> = (props) => {
  showWorkbenchPreviewMode();

  return (
    <ShoppingRootStore.Provider value={ShoppingRrootInit(props.spContext)}>
      <ShoppingNavigation />
    </ShoppingRootStore.Provider>
  );
};

export default ShoppingRoot;
