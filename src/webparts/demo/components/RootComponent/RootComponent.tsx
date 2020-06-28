import * as React from "react";

import { IRootComponentProps } from "./IRootComponentProps";
import RootStore, { rootInit } from "./RootStore";
import NavHome from "../Navigation/NavHome";
import * as jQuery from "jquery";

import Test1 from "../Test1/ListTest1";

function fixWorkbench(elem?: any, depth: number = 0) {
  //workbenchPageContent
  if (!elem && depth === 0)
    elem = document.getElementById("workbenchPageContent");
  if (!elem || depth > 20) return null;
  elem.style.padding = "0px 0px 0px 0px";
  elem.style.margin = "0px 0px 0px 0px";
  elem.style.width = "1500px";
  (Array as any).from(elem.children).map(child => fixWorkbench(child, depth + 1));
}

const RootComponent: React.FC<IRootComponentProps> = (props) => {

  React.useEffect(() => {
    fixWorkbench();

    jQuery("#workbenchPageContent").prop("style", "max-width: none");
    jQuery(".SPCanvas-canvas").prop("style", "max-width: none");
    jQuery(".CanvasZone").prop("style", "max-width: none");

  }, [])

  return (
    <div >
      <RootStore.Provider value={rootInit(props.spContext)}>
        {/* <Welcome />
            <Test1 /> */}

        <NavHome />
      </RootStore.Provider>
    </div >
  );

};

export default RootComponent;
