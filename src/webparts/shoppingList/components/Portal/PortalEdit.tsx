import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";

import Screen from "../../../../Common/Screen";
import {
  AppForm,
  AppFormField,
  ButtonGroup,
  SubmitButton,
  AppButton,
} from "../../../../Common/Formik";

import ShoppingRootStore from "../ShoppingRoot/ShoppingRootStore";
import { Portal } from "./PortalStore";
import { Formik } from "formik";

const PortalEdit: React.FC = () => {
  const { categoryStore, spContext } = useContext(ShoppingRootStore);

  const [category, setPortal] = useState(new Portal());
  const [load, setLoad] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  let { id } = useParams();
  let history = useHistory();

  const validationSchema = Yup.object().shape({
    Title: Yup.string().required().min(1).label("Title"),
  });

  useEffect(() => {
    debugger;
    if (id) {
      setLoad(true);
      categoryStore.getItemById(id).then((val) => {
        debugger;
        setPortal(new Portal(val as any));
        setLoad(false);
      });
    }
  }, [categoryStore.getItemById]);

  const onSubmit = (values: any) => {
    debugger;
    setSubmitting(true);
    categoryStore.updateListItem(values).then(() => {
      history.push("/PortalList");
    });
  };

  const onBack = () => {
    history.push("/PortalList");
  };

  const onDelete = () => {
    setSubmitting(true);
    debugger;
    categoryStore.deleteListItem(id).then(() => {
      setSubmitting(false);
      history.push("/PortalList");
    });
  };

  return (
    <Screen loading={false}>
      <AppForm
        initialValues={category}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        loadingInitial={load}
      >
        <AppFormField name="Title" placeholder="Title" />

        <ButtonGroup>
          <SubmitButton title="Submit" loader={submitting} />
          <AppButton title="Delete" onClick={onDelete} loader={submitting} />
          <AppButton title="Back" onClick={onBack} loader={submitting} />
        </ButtonGroup>
      </AppForm>
    </Screen>
  );
};

export default PortalEdit;

