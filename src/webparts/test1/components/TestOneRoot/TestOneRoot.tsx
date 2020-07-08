import * as React from "react";

import { IRootProps } from "../../../../Common/IRootProps";
import TestOneNavigation from "./TestOneNavigation";
import TestOneRootStore, { TestOneRrootInit } from "./TestOneRootStore";
import { showWorkbenchPreviewMode } from "../../../../Common/WorkbenchView";

const TestOneRoot: React.FC<IRootProps> = (props) => {
  showWorkbenchPreviewMode();

  return (
    <TestOneRootStore.Provider value={TestOneRrootInit(props.spContext)}>
      <TestOneNavigation />
    </TestOneRootStore.Provider>
  );
};

export default TestOneRoot;
