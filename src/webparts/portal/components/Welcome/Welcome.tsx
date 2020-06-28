import * as React from "react";
import { useContext, useState } from "react";
import PortalRootStore from "../PortalRoot/PortalRootStore";
export interface IListItemsProps { }

const Welcome: React.FC<IListItemsProps> = (props) => {

    const { welcomeStore } = useContext(PortalRootStore);

    // React.useEffect(() => {

    // }, [newsStore.setNews])

    return (
        <div>
            <h1>Welcome - {welcomeStore.message} </h1>
        </div>
    );
};
export default Welcome; 