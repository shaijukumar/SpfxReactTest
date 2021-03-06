import * as React from "react";

import ActivityIndicator from "./ActivityIndicator";
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
