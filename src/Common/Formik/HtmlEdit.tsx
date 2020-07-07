import React, { useRef, useState } from "react";

import JoditEditor from "jodit-react";
import { FormGroup, ControlLabel, FormControl, HelpBlock } from "rsuite";
import ErrorMessage from "./ErrorMessage";
import { useFormikContext } from "formik";

const HtmlEdit: React.FC<{
  value?: any;
  name: string;
  required?: boolean;
  placeholder?: string;
}> = ({ value, name, required = false, placeholder }) => {
  const {
    setFieldTouched,
    handleChange,
    errors,
    touched,
    values,
  } = useFormikContext();

  const editor = useRef(null);
  const [content, setContent] = useState("");
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    height: 600,
  };

  const handleEditorChange = (content: any, editor: any) => {
    console.log("Content was updated:", content);
  };

  return (
    <FormGroup>
      <ControlLabel>{placeholder}</ControlLabel>

      <JoditEditor
        ref={editor}
        value={String((values as any)[name])}
        config={config}
        onBlur={handleChange(name)}
      />

      {required && <HelpBlock>Required</HelpBlock>}
      <ErrorMessage
        error={(errors as any)[name]}
        visible={(touched as any)[name]}
      />
    </FormGroup>
  );
};

export default HtmlEdit;
