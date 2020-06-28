import * as React from "react";
import { useContext, useEffect, useState } from "react";
import RootStore from "../RootComponent/RootStore";
import { Link, RouteComponentProps, useParams, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

import AppFormField from "../forms/AppFormField";
import SubmitButton from "../forms/SubmitButton";
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form as F1,
    Field,
    FieldProps,
} from 'formik';



import * as Yup from "yup";
import { Test1 } from "./TestStore";

interface MyFormValues {
    Title: string;
    Description: string;
}

const EditTest1: React.FC = () => {

    const { testStore } = useContext(RootStore);
    let { id } = useParams();
    let history = useHistory();

    const [load, setLoad] = useState(false);
    const [test1, setTest1] = useState(new Test1());

    testStore.setLoading = setLoad;

    useEffect(() => {
        if (id) {
            testStore.getItemById(id).then((val) => {
                setTest1(new Test1(val));
            });
        }
    }, [testStore.getItemById]);

    const validationSchema = Yup.object().shape({
        Title: Yup.string().required().min(1).label("Title"),
        Description: Yup.string().required().min(1).label("Description"),
    });

    const onCatalogSubmit = (values, { setErrors }) => {

        if (!id) {
            testStore.createListItem(values).then(() => {
                history.push(`/`);
            })
                .catch((err: string) => {
                    debugger;
                    console.log(err);
                })
        }
        else {
            testStore.updateListItem(id, values).then(() => {
                history.push(`/`);
            })
                .catch((err: string) => {
                    debugger;
                    console.log(err);
                });
        }
    }

    return (
        <div>
            {load ? (
                <h2>Loading... </h2>
            ) : (

                    <Formik
                        initialValues={test1}
                        validationSchema={validationSchema}
                        onSubmit={onCatalogSubmit}
                        enableReinitialize
                    >
                        {() => {
                            return (<>

                                <AppFormField name="Title" placeholder="Title" />

                                <AppFormField name="Description" placeholder="Description" />

                                <SubmitButton title="Submit" />

                                {test1.Id > 0 &&
                                    (
                                        <Button variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                testStore.deleteListItem(test1.Id.toString()).then(() => {
                                                    history.push(`/`);
                                                })
                                                    .catch((err: string) => {
                                                        debugger;
                                                        console.log(err);
                                                    });
                                                ;
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    )

                                }

                                <Button variant="contained"
                                    color="primary"
                                    onClick={() => { history.push(`/`); }}
                                >
                                    Back to listing
                                </Button>


                            </>)
                        }}
                    </Formik>
                )
            }
        </div>
    );
};
//export default TestComp;
export default EditTest1;

