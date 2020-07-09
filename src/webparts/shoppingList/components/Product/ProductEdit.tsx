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
  DropDownPicker,
  AppSelector,
} from "../../../../Common/Formik";

import ShoppingRootStore from "../ShoppingRoot/ShoppingRootStore";
import { Product } from "./ProductStore";
import { Formik } from "formik";
import { Button, Modal } from "rsuite";
import { Category } from "../Category/CategoryStore";
import CategoryList from "../Category/CategoryList";

const qtyTypes = [
  {
    label: "Kg",
    value: "Kg",
  },
  {
    label: "No",
    value: "No",
  },
  {
    label: "Litter",
    value: "Litter",
  },
];
const ProductEdit: React.FC = () => {
  const { productStore, categoryStore } = useContext(ShoppingRootStore);

  const [product, setProduct] = useState(new Product());
  const [categoryList, setCategoryList] = useState([]);
  const [load, setLoad] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  let { id } = useParams();
  let history = useHistory();

  const validationSchema = Yup.object().shape({
    Title: Yup.string().required().min(1).label("Title"),
    CategoryId: Yup.string().required().min(1).label("Title"),
    QtyType: Yup.string().required().min(1).label("Title"),
    //RequiredStock: Yup.string().required().min(1).label("Title"),
    //CurrentStock: Yup.string().required().min(1).label("Title"),
  });

  useEffect(() => {
    debugger;
    if (id) {
      setLoad(true);
      productStore.getItemById(id).then((val) => {
        //debugger;
        setProduct(new Product(val as any));
        setLoad(false);
      });
    }

    categoryStore.getTree().then((cat) => {
      setCategoryList(cat);
    });
  }, [productStore.getItemById]);

  const onSubmit = (values: any) => {
    debugger;
    setSubmitting(true);
    productStore.updateListItem(values).then(() => {
      history.push("/ProductList");
    });
  };

  const onBack = () => {
    history.push("/ProductList");
  };

  const onDelete = () => {
    setSubmitting(true);
    debugger;
    productStore.deleteListItem(id).then(() => {
      setSubmitting(false);
      history.push("/ProductList");
    });
  };

  return (
    <>
      <Screen loading={false}>
        <AppForm
          initialValues={product}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          loadingInitial={load}
        >
          <AppFormField name="Title" placeholder="Title" />
          <Button appearance="link" onClick={() => setShowCategory(true)}>
            Manage Category
          </Button>
          <DropDownPicker
            name="CategoryId"
            placeholder="Category"
            data={categoryList}
          />
          <DropDownPicker
            name="QtyType"
            placeholder="Qty Type"
            data={qtyTypes}
          />
          <AppFormField name="RequiredStock" placeholder="Required Stock" />
          <AppFormField name="CurrentStock" placeholder="Current Stock" />

          <ButtonGroup>
            <SubmitButton title="Submit" loader={submitting} />
            <AppButton title="Delete" onClick={onDelete} loader={submitting} />
            <AppButton title="Back" onClick={onBack} loader={submitting} />
          </ButtonGroup>
        </AppForm>
      </Screen>

      <Modal
        show={showCategory}
        onHide={() => {
          setShowCategory(false);
        }}
      >
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoryList />
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setShowCategory(false);
            }}
            appearance="primary"
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductEdit;
