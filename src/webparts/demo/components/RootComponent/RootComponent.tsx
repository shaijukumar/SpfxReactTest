import * as React from "react";

import { IRootComponentProps } from "./IRootComponentProps";
import RootStore, { rootInit } from "./RootStore";
import NavHome from "../Navigation/NavHome";

import Test1 from "../Test1/ListTest1";

const RootComponent: React.FC<IRootComponentProps> = (props) => {
  return (
    <RootStore.Provider value={rootInit(props.spContext)}>
      {/* <Welcome />
            <Test1 /> */}

      <NavHome />
    </RootStore.Provider>
  );
};

export default RootComponent;
