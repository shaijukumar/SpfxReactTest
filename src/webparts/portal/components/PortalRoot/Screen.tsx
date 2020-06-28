import * as React from "react";
import { useContext, useState } from "react";
import PortalRootStore from "../PortalRoot/PortalRootStore";
import ActivityIndicator from "../Common/ActivityIndicator";
export interface IListItemsProps {}

export interface IScreenProps {
  children?: any;
  loading?: boolean;
}
const Screen: React.FC<IScreenProps> = ({ children, loading = false }) => {
  return (
    <section className="container home" style={{ width: "1170px" }}>
      {loading && <ActivityIndicator />}
      {!loading && <>{children}</>}
    </section>
  );
};
export default Screen;
