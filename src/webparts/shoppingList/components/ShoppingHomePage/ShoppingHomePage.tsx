import * as React from "react";
import { useContext, useState } from "react";
import ShoppingRootStore from "../ShoppingRoot/ShoppingRootStore";
import "rsuite/dist/styles/rsuite-default.css"; //'rsuite/dist/styles/rsuite-default.css'
import { Button } from "rsuite";
export interface IListItemsProps {}

const ShoppingHomePage: React.FC<IListItemsProps> = (props) => {
  const { categoryStore } = useContext(ShoppingRootStore);

  const [categories, setCategories] = useState([]);

  React.useEffect(() => {
    categoryStore.GeItems().then((cl) => {
      debugger;
      setCategories(cl);
    });
  }, [categoryStore.GeItems]);

  return (
    <div>
      <h1>Shopping Home Page112</h1>
      <Button>Hello World</Button>
      {categories && categories.map((cat) => <div>{cat.Title}</div>)}
    </div>
  );
};
export default ShoppingHomePage;
