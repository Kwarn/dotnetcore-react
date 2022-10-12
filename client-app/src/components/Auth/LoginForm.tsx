import { Form, Formik } from "formik";
import React from "react";
import { Button } from "semantic-ui-react";
import TextInput from "../Common/TextInput";

const LoginForm = () => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleSubmit }) => (
        <Form
          style={{ marginTop: "7em" }}
          className="ui form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <TextInput name="email" placeholder="Email" />
          <TextInput name="password" placeholder="Password" type="password" />
          <Button positive fluid content="Login" type="submit" />
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
