import * as React from "react";
import { IPortalRootProps } from "./IPortalRootProps";
import * as jQuery from "jquery";
import PortalNavigation from "./PortalNavigation";

import PortalRootStore, { portalRrootInit } from "./PortalRootStore";
// import NavHome from "../Navigation/NavHome";
// 

// import Test1 from "../Test1/ListTest1";

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

const PortalRoot: React.FC<IPortalRootProps> = (props) => {

    React.useEffect(() => {
        fixWorkbench();

        jQuery("#workbenchPageContent").prop("style", "max-width: none");
        jQuery(".SPCanvas-canvas").prop("style", "max-width: none");
        jQuery(".CanvasZone").prop("style", "max-width: none");

    }, [])

    return (
        <div >
            <PortalRootStore.Provider value={portalRrootInit(props.spContext)}>
                <PortalNavigation />
            </PortalRootStore.Provider>
        </div >
    );

};

export default PortalRoot;
