import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { InputNumber } from "rsuite";

import { Product } from "../Product/ProductStore";
import ShoppingRootStore from "../ShoppingRoot/ShoppingRootStore";

const ProductCounter: React.FC<{ product: Product; name: string }> = ({
  product,
  name,
}) => {
  const { productStore } = useContext(ShoppingRootStore);
  const [val, setVal] = useState(product[name]);

  return (
    <InputNumber
      value={val}
      style={{ width: 100 }}
      onChange={(v) => {
        setVal(v);
        product[name] = v;
        productStore.updateListItem(product);
      }}
    />
    // <Checkbox
    //   value={val}
    //   checked={val}
    //   onChange={(p1, p2) => {
    //     debugger;
    //     product.Shop = !product.Shop;
    //     setVal(product.Shop);
    //     productStore.updateListItem({ Id: product.Id, Shop: product.Shop });
    //     //productStore.updateListItem(product);
    //   }}
    // >
    //   {product.Title}({product.CurrentStock}/{product.RequiredStock}){" "}
    // </Checkbox>
  );
};

export default ProductCounter;
