import * as React from "react";
import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Grid, Col } from "rsuite";

import Screen from "../../../../Common/Screen";
import ShoppingRootStore from "../ShoppingRoot/ShoppingRootStore";
import { Product } from "./ProductStore";
import ProductCounter from "./ProductCounter";

export interface IListItemsProps {}

const ProductList: React.FC = (props) => {
  const { productStore, spContext } = useContext(ShoppingRootStore);

  const cl: Product[] = [];
  const [products, setProducts] = useState(cl);
  const [load, setLoad] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  let history = useHistory();

  React.useEffect(() => {
    setLoad(true);
    productStore.getItems().then((cl) => {
      //debugger;
      setProducts(cl);
      setLoad(false);
    });
  }, [productStore.getItems]);

  return (
    <Screen loading={false}>
      {/* {tests.length > 0 && tests.map((item) => <div>{item.Title}</div>)} */}

      <Button
        appearance="link"
        onClick={() => {
          history.push("/");
        }}
      >
        Back to home
      </Button>

      <Button
        appearance="link"
        onClick={() => {
          history.push("/NewProduct");
        }}
      >
        Add New1235
      </Button>

      {products.map((p) => (
        <div style={{ clear: "both" }}>
          <div style={{ width: 300, float: "left" }}>
            {p.Title} - {p.RequiredStock}
          </div>
          <div style={{ width: 100, float: "left" }}>
            <ProductCounter name="CurrentStock" product={p} />
          </div>
        </div>
      ))}

      {/* <Table
        height={400}
        data={products}
        loading={load}
        onRowClick={(data) => {
          //console.log(data);
          history.push(`/Product/${data.Id}`);
        }}
      >
        <Table.Column width={70} align="left" fixed>
          <Table.HeaderCell>Id</Table.HeaderCell>
          <Table.Cell dataKey="Id" style={{}} />
        </Table.Column>

        <Table.Column width={200} align="left">
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.Cell dataKey="Title" />
        </Table.Column>
     
        <Table.Column width={100} align="left">
          <Table.HeaderCell>QtyType</Table.HeaderCell>
          <Table.Cell dataKey="QtyType" />
        </Table.Column>

        <Table.Column width={100} align="left">
          <Table.HeaderCell>Required Stock</Table.HeaderCell>
          <Table.Cell dataKey="RequiredStock" />
        </Table.Column>

        <Table.Column width={100} align="left">
          <Table.HeaderCell>CurrentStock</Table.HeaderCell>
          <Table.Cell dataKey="CurrentStock" />
        </Table.Column>
      </Table> */}
    </Screen>
  );
};

export default ProductList;
