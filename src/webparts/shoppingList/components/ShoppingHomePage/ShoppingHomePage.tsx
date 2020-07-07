import * as React from "react";
import { useContext, useState } from "react";
import ShoppingRootStore from "../ShoppingRoot/ShoppingRootStore";
import "rsuite/dist/styles/rsuite-default.css"; //'rsuite/dist/styles/rsuite-default.css'
import { Button } from "rsuite";
import CategoryList from "../Category/CategoryList";
export interface IListItemsProps {}

const ShoppingHomePage: React.FC<IListItemsProps> = (props) => {
  // const { categoryStore } = useContext(ShoppingRootStore);

  // const [categories, setCategories] = useState([]);

  // React.useEffect(() => {
  //   categoryStore.geItems().then((cl) => {
  //     debugger;
  //     setCategories(cl);
  //   });
  // }, [categoryStore.geItems]);

  return (
    <div>
      <div>Test112 </div>
      <CategoryList />
      {/* {categories && categories.map((cat) => <div>{cat.Title}</div>)} */}
    </div>
  );
};
export default ShoppingHomePage;
