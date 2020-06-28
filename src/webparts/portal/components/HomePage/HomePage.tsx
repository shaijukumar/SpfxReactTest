import * as React from "react";
import { useContext, useState } from "react";
import PortalBaseStore from "../PortalRoot/PortalBaseStore"

import "../../Style/test.css"

export interface IListItemsProps { }

const HomePage: React.FC<IListItemsProps> = (props) => {

    //const { spContext } = useContext(PortalBaseStore);

    // React.useEffect(() => {

    // }, [newsStore.setNews])

    return (
        <div>
            <h1 className="redText">Home Page 1</h1>
        </div>
    );
};
export default HomePage;