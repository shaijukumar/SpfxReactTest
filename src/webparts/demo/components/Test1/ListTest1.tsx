import * as React from "react";
import { useContext, useState } from "react";
import { Link, useHistory } from 'react-router-dom';


import RootStore from "../RootComponent/RootStore";
import WelcomeStore from "../Welcome/WelcomeStore";
export interface IListItemsProps { }

const ListTest1: React.FC = (props) => {
  const { testStore, spContext } = useContext(RootStore);
  const [load, setLoad] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  testStore.setLoading = setLoad;
  testStore.setSubmitting = setSubmitting;
  let history = useHistory();

  React.useEffect(() => {
    testStore.getAllItems();
  }, [testStore.getAllItems]);

  return (
    <div>
      <h1>Test 1</h1>

      {load ? (
        <h2>Loading... </h2>
      ) : (
          testStore.items.map((item) => (
            <div key={item.Id} >
              {item.Id} -
              <a href="#"
                onClick={() => {
                  history.push(`/EditTest1/${item.Id}`)
                }}>{item.Title}</a>
              - {item.Description}
              <hr />
            </div>
          ))
        )}
    </div>
  );
};

export default ListTest1;
