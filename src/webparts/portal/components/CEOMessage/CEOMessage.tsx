import * as React from "react";
import { useContext, useState } from "react";
export interface IListItemsProps { }

const CEOMessage: React.FC<IListItemsProps> = (props) => {

    //const { meTest, newsStore } = useContext(RootStore);

    // React.useEffect(() => {

    // }, [newsStore.setNews])

    return (
        <div>
            <h1>Announcements</h1>
        </div>
    );
};
export default CEOMessage;