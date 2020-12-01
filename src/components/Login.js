import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Label } from './Theme';
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
         .email()
         .required("Email Required"),
  password: Yup.string()
           .required("Password Required")
           .min(6, "Password must be of atleast 6 characters")
});

const initialValues = {
  email: "",
  password: ""
};

export const Login = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      
      onSubmit={(values) => {
        fetch("/api/v2/users/tokens/", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },

       body: JSON.stringify({
        email: values.email,
        password: values.password
      })
    })
     .then( (response) => { 
     let token = response.headers.map.authorization;
     localStorage.setItem("token", token);
     window.location.href="/users";
      
});
      }}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <div className="container">
            <h1>Skand IO Login</h1>
            <Form>
              <div className="form-row">
                <Label htmlFor="email">Email</Label><br/>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className={
                    errors.email && touched.email ? "input-error" : null
                  }
                  style={{width:'250px'}}
                /><br/>
                <ErrorMessage name="email" component="span" className="error" />
              </div>
              <br/>

              <div className="form-row">
                <Label htmlFor="password">Password</Label><br/>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className={
                    errors.password && touched.password ? "input-error" : null
                  }
                  style={{width:'250px'}}
                /><br/>
                <ErrorMessage
                  name="password"
                  component="span"
                  className="error"
                />
              </div>
              <br/>

              <Button
                type="submit"
                className={!(dirty && isValid) ? "disabled-btn" : ""}
                disabled={!(dirty && isValid)}
              >
                Sign In
              </Button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};


