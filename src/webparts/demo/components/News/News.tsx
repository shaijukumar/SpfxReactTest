import * as React from "react";
import { useContext, useState } from "react";
import RootStore from "../RootComponent/RootStore";
export interface IListItemsProps { }

const News: React.FC<IListItemsProps> = (props) => {

    const { meTest, newsStore } = useContext(RootStore);
    const [t, setT] = useState(false);
    React.useEffect(() => {
        newsStore.setNews("News 2");
        setT(!t);
    }, [newsStore.setNews])

    return (
        <div>
            News :  {newsStore.news}
        </div>
    );
};
//export default TestComp;
export default News;