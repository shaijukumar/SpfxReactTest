import * as React from "react";
import { useFormikContext } from "formik";
import TextField from "@material-ui/core/TextField";

import ErrorMessage from "./ErrorMessage";


const AppFormField: React.FC<{
  value?: any,
  name: string,
  width?: number,
  autoCapitalize?: string,
  autoCorrect?: boolean,
  icon?: string,
  keyboardType?: string,
  placeholder?: string,
  textContentType?: string,
  secureTextEntry?: boolean,
  maxLength?: number,
  multiline?: boolean,
  numberOfLines?: number,

}> =
  ({
    value,
    name,
    width,
    autoCapitalize,
    autoCorrect = true,
    icon,
    keyboardType,
    placeholder,
    textContentType,
    secureTextEntry,
    maxLength,
    multiline,
    numberOfLines = 1 }) => {

    const { setFieldTouched, handleChange, errors, touched, values } = useFormikContext();

    // console.log("values")
    // console.log(values)

    return (
      <>
        <TextField id="standard-basic"
          value={String((values as any)[name])}
          onBlur={() => setFieldTouched(name)}
          onChange={handleChange(name)}
          label={placeholder}
        />

        <ErrorMessage error={errors[name]} visible={touched[name]} />

      </>
    );
  }

export default AppFormField;
