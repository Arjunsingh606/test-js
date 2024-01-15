import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "./TextField";

const Form = () => {

    // const validation = Yup.object()({
    //     firstName: Yup.string()
    //       .firstName()
    //       .required("Required")
    //   })

  return (
    <>
      <h3>SignUp Form</h3>
      <Formik>
        initialValues=
        {{
          firstName:"",
          lastName:"",
          email: "",
          password: "",
          confirmPassword:""
        }}
        validationSchema = {validation}
      </Formik>
      {
        <Form>
            <TextField lable="firstName" name="firstName" type="text"/>
            <TextField lable="lastName" name="lastName" type="text"/>
            <TextField lable="Email" name="email" type="email"/>
            <TextField lable="password" name="password" type="password"/>
            <TextField lable="confirm password" name="confirm password" type="password"/>
            
        </Form>
      }
    </>
  );
};

export default Form;
