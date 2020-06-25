import * as React from "react";
import { useContext, useEffect, useState } from "react";
import RootStore from "../RootComponent/RootStore";
export interface IListItemsProps {}

const Welcome: React.FC<IListItemsProps> = (props) => {
  const { spContext, setMeTest, welcomeStore, testStore } = useContext(
    RootStore
  );

  const [t, setT] = useState(false);

  useEffect(() => {
    welcomeStore.setMessage("Welcome1");
    setT(!t);
  }, [welcomeStore.setMessage]);

  return (
    <div>
      <h3>
        Welcome - {welcomeStore.message} -{" "}
        {spContext.pageContext.user.displayName}{" "}
      </h3>
      <hr />
      <div
        onClick={() => {
          testStore.getAllItems();
        }}
      >
        Refresh
      </div>
      <hr />
    </div>
  );
};
//export default TestComp;
export default Welcome;
