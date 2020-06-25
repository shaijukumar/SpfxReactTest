import * as React from "react";
import { useContext, useState } from "react";
import RootStore from "../RootComponent/RootStore";
import WelcomeStore from "../Welcome/WelcomeStore";
export interface IListItemsProps {}

const Test1: React.FC<IListItemsProps> = (props) => {
  const { testStore, spContext } = useContext(RootStore);
  const [load, setLoad] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  testStore.setLoading = setLoad;
  testStore.setSubmitting = setSubmitting;

  React.useEffect(() => {
    testStore.getAllItems();
  }, [testStore.getAllItems]);

  return (
    <div>
      <h1>Test 1</h1>

      <div>
        <div
          style={{
            float: "left",
            paddingRight: "20px",
            backgroundColor: "gray",
          }}
          onClick={() => {
            testStore.getAllItems();
          }}
        >
          {load ? "Updating...." : "refresh"}
        </div>

        <div
          style={{
            float: "left",
            paddingRight: "20px",
            backgroundColor: "gray",
          }}
          onClick={() => {
            testStore.updateListItem().then(() => testStore.getAllItems());
          }}
        >
          {submitting ? "Updating...." : "Update"}
        </div>

        <div
          style={{
            float: "left",
            paddingRight: "10px",
            backgroundColor: "orange",
          }}
          onClick={() => {
            testStore.createListItem().then(() => testStore.getAllItems());
          }}
        >
          {submitting ? "Creating...." : "Create New"}
        </div>
        <br />
        <br />
        <br />
      </div>
      {load ? (
        <h2>Loading... </h2>
      ) : (
        testStore.items.map((item) => (
          <div key={item.Id}>
            {item.Id} - {item.Title} - {item.Description}
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default Test1;
