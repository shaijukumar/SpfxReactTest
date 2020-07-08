import * as React from "react";
import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Table, Button } from "rsuite";

import Screen from "../../../../Common/Screen";
import TestOneRootStore from "../TestOneRoot/TestOneRootStore";
import { Product } from "./ProductStore";

export interface IListItemsProps {}

const ProductList: React.FC = (props) => {
  const { testStore, spContext } = useContext(TestOneRootStore);

  const cl: Product[] = [];
  const [tests, setCategories] = useState(cl);
  const [load, setLoad] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  let history = useHistory();

  React.useEffect(() => {
    setLoad(true);
    testStore.getItems().then((cl) => {
      //debugger;
      setCategories(cl);
      setLoad(false);
    });
  }, [testStore.getItems]);

  return (
    <Screen loading={false}>
      {/* {tests.length > 0 && tests.map((item) => <div>{item.Title}</div>)} */}

      <Button
        appearance="link"
        onClick={() => {
          history.push("/NewProduct");
        }}
      >
        Add New
      </Button>

      <Table
        height={400}
        data={tests}
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
      </Table>
    </Screen>
  );
};

export default ProductList;

