import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Table, Button, Checkbox, Panel, Grid, Row, Col } from "rsuite";

import ShoppingRootStore from "../ShoppingRoot/ShoppingRootStore";
import { Product } from "../Product/ProductStore";
import { Item } from "@pnp/sp/items";
import ShopCheckBox from "./ShopCheckBox";

const ShoppingList: React.FC = () => {
  const { productStore, spContext } = useContext(ShoppingRootStore);
  const [load, setLoad] = useState(false);
  const cl: Product[] = [];
  const [products, setProducts] = useState(cl);

  let history = useHistory();

  React.useEffect(() => {
    setLoad(true);
    productStore.getShoppingList().then((cl) => {
      //debugger;
      setProducts(cl);
      setLoad(false);
    });
  }, [productStore.getItems]);

  const OnSelect = (value: any) => {
    debugger;
    setProducts(products);
    alert(value);
    productStore.updateListItem(value);
  };

  return (
    <>
      <h3>List12345</h3>

      <Button
        appearance="link"
        onClick={() => {
          history.push("/ProductList");
        }}
      >
        Stock
      </Button>

      {products.map((p) => (
        <ShopCheckBox product={p} />
      ))}
    </>
  );
};

export default ShoppingList;
