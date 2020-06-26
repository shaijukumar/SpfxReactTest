import * as React from "react";
import { useFormikContext } from "formik";
import { Button } from '@material-ui/core';


const SubmitButton: React.FC<{ title: string }> = ({ title }) => {

    const { handleSubmit, dirty } = useFormikContext();

    return <><Button variant="contained" color="primary" onClick={() => { handleSubmit()} }>{title}</Button></>
        
    // <Button title={title} onPress={handleSubmit} disabled={!dirty} />;
}

export default SubmitButton;
