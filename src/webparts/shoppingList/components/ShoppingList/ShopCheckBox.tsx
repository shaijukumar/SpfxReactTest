import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { Checkbox } from "rsuite";

import { Product } from "../Product/ProductStore";
import ShoppingRootStore from "../ShoppingRoot/ShoppingRootStore";

const ShopCheckBox: React.FC<{ product: Product }> = ({ product }) => {
  const { productStore } = useContext(ShoppingRootStore);
  const [val, setVal] = useState(product.Shop);

  return (
    <Checkbox
      value={val}
      checked={val}
      onChange={(p1, p2) => {
        debugger;
        product.Shop = !product.Shop;
        setVal(product.Shop);
        productStore.updateListItem({ Id: product.Id, Shop: product.Shop });
        //productStore.updateListItem(product);
      }}
    >
      {product.Title}({product.CurrentStock}/{product.RequiredStock}){" "}
    </Checkbox>
  );
};

export default ShopCheckBox;
