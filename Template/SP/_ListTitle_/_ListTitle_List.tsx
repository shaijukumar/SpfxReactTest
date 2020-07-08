import * as React from "react";
import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Table, Button } from "rsuite";

import Screen from "../../../../Common/Screen";
import _WpName_RootStore from "../_WpName_Root/_WpName_RootStore";
import { _ListTitle_ } from "./_ListTitle_Store";

export interface IListItemsProps {}

const _ListTitle_List: React.FC = (props) => {
  const { _ListTitleObj_Store, spContext } = useContext(_WpName_RootStore);

  const cl: _ListTitle_[] = [];
  const [_ListTitleObj_s, setCategories] = useState(cl);
  const [load, setLoad] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  let history = useHistory();

  React.useEffect(() => {
    setLoad(true);
    _ListTitleObj_Store.getItems().then((cl) => {
      //debugger;
      setCategories(cl);
      setLoad(false);
    });
  }, [_ListTitleObj_Store.getItems]);

  return (
    <Screen loading={false}>
      {/* {_ListTitleObj_s.length > 0 && _ListTitleObj_s.map((item) => <div>{item.Title}</div>)} */}

      <Button
        appearance="link"
        onClick={() => {
          history.push("/New_ListTitle_");
        }}
      >
        Add New
      </Button>

      <Table
        height={400}
        data={_ListTitleObj_s}
        loading={load}
        onRowClick={(data) => {
          //console.log(data);
          history.push(`/_ListTitle_/${data.Id}`);
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

export default _ListTitle_List;
