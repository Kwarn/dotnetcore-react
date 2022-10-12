import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Label } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import TextInput from "../Common/TextInput";

const LoginForm = () => {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{ email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .login(values)
          .catch(() => setErrors({ error: "Invalid email or password" }))
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form
          style={{ marginTop: "7em" }}
          className="ui form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <TextInput name="email" placeholder="Email" />
          <TextInput name="password" placeholder="Password" type="password" />
          <ErrorMessage name='error' render={() => <Label style={{marginBottom: 10}} basic color="red" content={errors.error}/>}/>
          <Button
            positive
            fluid
            content="Login"
            type="submit"
            loading={isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
};

export default observer(LoginForm);
