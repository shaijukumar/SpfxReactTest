import * as React from "react";
import { IPortalRootProps } from "./IPortalRootProps";
import * as jQuery from "jquery";
import PortalNavigation from "./PortalNavigation";

import PortalRootStore, { portalRrootInit } from "./PortalRootStore";

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

const PortalRoot: React.FC<IPortalRootProps> = (props) => {
  React.useEffect(() => {
    //     fixWorkbench();

    jQuery("#workbenchPageContent").prop("style", "max-width: none");
    jQuery(".SPCanvas-canvas").prop("style", "max-width: none");
    jQuery(".CanvasZone").prop("style", "max-width: none");

    setTimeout(() => {
      var myElement = jQuery(
        'button[data-automation-id="workbench-command-bar-preview"]'
      ).click();
      jQuery(".dragIconContainer_90be1210").prop("style", "visibility: hidden");
    }, 100);
  }, []);

  // const [contextValue, SetContextValue] = React.useState(null);

  // React.useEffect(() => {
  //   SetContextValue(portalRrootInit(props.spContext));
  // }, [portalRrootInit]);

  return (
    <PortalRootStore.Provider value={portalRrootInit(props.spContext)}>
      <PortalNavigation />
    </PortalRootStore.Provider>
  );
};

export default PortalRoot;
