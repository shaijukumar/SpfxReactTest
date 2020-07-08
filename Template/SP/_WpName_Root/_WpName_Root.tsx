import * as React from "react";

import { IRootProps } from "../../../../Common/IRootProps";
import _WpName_Navigation from "./_WpName_Navigation";
import _WpName_RootStore, { _WpName_RrootInit } from "./_WpName_RootStore";
import { showWorkbenchPreviewMode } from "../../../../Common/WorkbenchView";

const _WpName_Root: React.FC<IRootProps> = (props) => {
  showWorkbenchPreviewMode();

  return (
    <_WpName_RootStore.Provider value={_WpName_RrootInit(props.spContext)}>
      <_WpName_Navigation />
    </_WpName_RootStore.Provider>
  );
};

export default _WpName_Root;
