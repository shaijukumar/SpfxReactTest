import * as React from "react";
import { useFormikContext } from "formik";
import {
  TreePicker,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
} from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
import ErrorMessage from "./ErrorMessage";
import { useState } from "react";

const AppSelector: React.FC<{
  value?: any;
  name: string;
  required?: boolean;
  width?: number;
  placeholder?: string;
  data?: any;
}> = ({
  value,
  name,
  required = false,
  width = 300,
  placeholder,
  data = [],
}) => {
  const {
    setFieldTouched,
    handleChange,
    errors,
    touched,
    values,
  } = useFormikContext();
  const [val, SetVal] = useState((values as any)[name]);

  const styles = { width: width, display: "block", marginBottom: 10 };

  return (
    <div style={{ width: width }}>
      <FormGroup>
        <ControlLabel>{placeholder}</ControlLabel>
        <TreePicker
          size="lg"
          placeholder={placeholder}
          data={data}
          style={styles}
          onChange={handleChange(name)}
          value={String((values as any)[name])}
          cleanable={false}
          defaultExpandAll
        />
        {required && <HelpBlock>Required</HelpBlock>}
        <ErrorMessage
          error={(errors as any)[name]}
          visible={(touched as any)[name]}
        />
      </FormGroup>
    </div>
  );
};

export default AppSelector;
