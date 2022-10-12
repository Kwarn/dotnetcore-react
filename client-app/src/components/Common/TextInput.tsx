import { useField } from "formik";
import { type } from "os";
import React from "react";
import { Form, Label } from "semantic-ui-react";

interface ITextInputProps {
  placeholder: string;
  name: string;
  type?: string;
  label?: string;
}

const TextInput = (props: ITextInputProps) => {
  const [field, meta] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
};

export default TextInput;
