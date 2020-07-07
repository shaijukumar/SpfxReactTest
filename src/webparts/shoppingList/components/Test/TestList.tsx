import * as React from "react";
import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Table, Button } from "rsuite";

import Screen from "../../../../Common/Screen";
import ShoppingRootStore from "../ShoppingRoot/ShoppingRootStore";
import { Test } from "./TestStore";

export interface IListItemsProps { }

const TestList: React.FC = (props) => {
  const { categoryStore, spContext } = useContext(ShoppingRootStore);

  const cl: Test[] = [];
  const [categories, setCategories] = useState(cl);
  const [load, setLoad] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  let history = useHistory();

  React.useEffect(() => {
    // const sa = ["Id", "Title"];
    // categoryStore.getItems({ seletArray: sa }).then((cl) => {
    setLoad(true);
    categoryStore.getItems().then((cl) => {
      //debugger;
      setCategories(cl);
      setLoad(false);
    });
  }, [categoryStore.getItems]);

  return (
    <Screen loading={false}>
      {/* {categories.length > 0 && categories.map((cat) => <div>{cat.Title}</div>)} */}

      <Button
        appearance="link"
        onClick={() => {
          history.push("/NewTest");
        }}
      >
        Add New
      </Button>

      <Table
        height={400}
        data={categories}
        loading={load}
        onRowClick={(data) => {
          //console.log(data);
          history.push(`/Test/${data.Id}`);
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

export default TestList;

